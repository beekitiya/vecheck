import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  AlertController
} from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import * as moment from "moment";

var wifiOBDReader;
declare var require: any;
declare var bluetoothSerial: any;
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-main",
  templateUrl: "main.html"
})
export class MainPage {
  formatDate;
  //host: string = "192.168.0.10:35000"; // ip:port 192.168.0.10:35000
  private pauseSub: any;
  private resumeSub: any;
  wifiOBDReader: any;
  connectInverval: any;
  connected: boolean = false;
  speed: string = "";
  temp: string = "";
  Speed: number;
  counter: number;
  counter_temp: number;
  Distance: string = "";
  last_visit: number;
  lastvisit: any;
  mile: any;
  showmile: string;
  oilEngine: any;
  carID: any;
  oil_engine = { "0": 7500, "1": 5000, "2": 10000 };
  alert = {};
  alert_per = {};
  alert_per_sorted = [];
  alert_name = {
    oil_engine: "น้ำมันเครื่อง",
    break: "ผ้าเบรค",
    car_tires: "ยางล้อรถยนต์",
    third_insurance_expire: "ต่อภาษีรถยนต์",
    oil_power: "น้ำมันพาเวอร์ / น้ำมันเบรค",
    rain_rubber: "ยางใบปัดน้ำฝน",
    battery: "แบตเตอรี่ + น้ำกลั่นในแบตเตอรี่ + กำลังไฟแบตเตอรี่",
    insurance_expire: "ประกันภัยภาคสมัครใจ",
    passenger_air_filter: "กรองอากาศแอร์ในห้องโดยสาร",
    air_filter: "กรองอากาศเครื่องยนต์",
    oil_gear: "น้ำมันเกียร์",
    back_gear: "น้ำมันเฟืองท้าย"
  };
  alert_type = {
    oil_engine: "กิโลเมตร",
    break: "กิโลเมตร",
    car_tires: "กิโลเมตร",
    third_insurance_expire: "เดือน",
    oil_power: "กิโลเมตร",
    rain_rubber: "เดือน",
    battery: "เดือน",
    insurance_expire: "เดือน",
    passenger_air_filter: "เดือน",
    air_filter: "เดือน",
    oil_gear: "กิโลเมตร",
    back_gear: "กิโลเมตร"
  };

  clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(n, max));
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ngZone: NgZone,
    public plt: Platform,
    public alertCtrl: AlertController,
    private readonly afs: AngularFirestore,
    private auth: AuthService,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      console.log(user, "Hi USER");
      if (!user) {
        this.plt.ready().then(() => {
          this.navCtrl.setRoot("LoginPage");
        });
      }
    });
    this.getFormatDate();

    var OBDReader = require("obd-bluetooth-tcp");
    wifiOBDReader = new OBDReader();
    var instance = this;
    this.counter = 0;
    this.counter_temp = 0;
    wifiOBDReader.on("debug", function(data) {
      console.log("=>APP DEBUG:" + data);
    });
    wifiOBDReader.on("error", function(data) {
      instance.ngZone.run(() => {
        instance.connected = false;
        if (instance.counter_temp > 0) {
          instance.updateMile(parseInt(instance.mile) + instance.counter_temp);
          instance.counter_temp = 0;
        }
      });

      console.log("=>APP ERROR:" + data);
      wifiOBDReader.autoconnect("bluetooth", "OBD");
    });
    wifiOBDReader.on("dataReceived", function(data) {
      //instance.stopClear();
      console.log("=>APP: Received Data=" + JSON.stringify(data));

      if (data.name && data.name == "vss") {
        if (data.value != null) {
          let kph = Math.round(data.value); // convert to mph
          instance.ngZone.run(() => {
            instance.Speed = kph;
            instance.counter += kph / 3600;
            instance.counter_temp += kph / 3600;
            instance.Distance = instance.counter.toFixed(2);
            instance.mile += kph / 3600;
            instance.showmile = instance.mile.toFixed(1);
          });
        } else {
          this.stop();
          setTimeout(() => this.start(), 1000);
        }
      }
    });

    wifiOBDReader.on("connected", function() {
      console.log("=>APP: Connected");
      instance.connected = true;
      //clearInterval(this.connectInverval);
      this.stopPolling();
      this.removeAllPollers();
      this.addPoller("vss"); // 0,220 mph
      console.log(
        "=======>ON START WE HAVE " + this.getNumPollers() + " pollers"
      );
      this.startPolling(1000); //Request  values every 1 second.
    }); // conneceted
  }

  start() {
    //console.log(this.host);
    this.plt.ready().then(() => {
      console.log("Platform ready, instantiating OBD");
      wifiOBDReader.setProtocol(0);
      //wifiOBDReader.autoconnect("TCP", this.host);
      wifiOBDReader.autoconnect("bluetooth", "OBD");
    }); // ready
  }

  stop() {
    this.plt.ready().then(() => {
      wifiOBDReader.removeAllPollers();
      wifiOBDReader.disconnect();
      this.connected = false;
      wifiOBDReader.stopPolling();
      console.log(
        "=======>ON STOP WE HAVE " + wifiOBDReader.getNumPollers() + " pollers"
      );
    });
  }

  stopClear() {
    clearInterval(this.connectInverval);
    console.log("clear interval");
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  ionViewWillUnload() {
    //this.pauseSub.unsubscribe();
  }

  increasedistance() {
    this.ngZone.run(() => {
      this.Speed = 50;
      this.counter += this.Speed / 3600;
      this.counter_temp += this.Speed / 3600;
      this.Distance = this.counter.toFixed(2);
      this.mile += this.Speed / 3600;
      this.showmile = this.mile.toFixed(1);
    });
  }

  loaduserProfile() {
    if (!this.auth.getcurrentUser()) {
      return;
    }
    var doc = this.afs
      .collection("Users")
      .doc(this.auth.getcurrentUser().uid)
      .collection("Cars");
    doc
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
      .subscribe(querySnapshot => {
        querySnapshot.forEach((docSnap: any) => {
          var CurrentDate = moment(new Date());
          this.mile = parseFloat(docSnap.car_mile);
          this.showmile = this.mile.toFixed(1);
          this.lastvisit = docSnap.last_visit;
          this.last_visit = parseInt(docSnap.last_visit.split("-")[1]);
          this.oilEngine = docSnap.engine_oil;
          this.carID = docSnap.id;
          if (!("air_filter" in docSnap)) {
            this.alert["air_filter"] = this.lastvisit;
            this.alert["passenger_air_filter"] = this.lastvisit;
            this.alert["rain_rubber"] = this.lastvisit;
            this.alert["battery"] = this.lastvisit;
            this.alert["oil_engine"] =
              Math.floor(this.mile / this.oil_engine[this.oilEngine]) *
              this.oil_engine[this.oilEngine];
            this.alert["break"] = Math.floor(this.mile / 40000) * 40000;
            this.alert["oil_gear"] = Math.floor(this.mile / 40000) * 40000;
            this.alert["back_gear"] = Math.floor(this.mile / 40000) * 40000;
            this.alert["car_tires"] = Math.floor(this.mile / 50000) * 50000;
            this.alert["oil_power"] = Math.floor(this.mile / 80000) * 80000;
            let colRef = this.afs
              .collection("Users")
              .doc(this.auth.getcurrentUser().uid)
              .collection("Cars")
              .doc(this.carID);
            let updateSingle = colRef.update({ ...this.alert });
          } else if (!("oil_engine" in docSnap)) {
            this.alert["oil_engine"] =
              Math.floor(this.mile / this.oil_engine[this.oilEngine]) *
              this.oil_engine[this.oilEngine];
            this.alert["break"] = Math.floor(this.mile / 40000) * 40000;
            this.alert["oil_gear"] = Math.floor(this.mile / 40000) * 40000;
            this.alert["back_gear"] = Math.floor(this.mile / 40000) * 40000;
            this.alert["car_tires"] = Math.floor(this.mile / 50000) * 50000;
            this.alert["oil_power"] = Math.floor(this.mile / 80000) * 80000;
            let colRef = this.afs
              .collection("Users")
              .doc(this.auth.getcurrentUser().uid)
              .collection("Cars")
              .doc(this.carID);
            let updateSingle = colRef.update({ ...this.alert });
          }
          this.alert["oil_engine"] = this.mile - docSnap.oil_engine;
          this.alert["break"] = this.mile - docSnap.break;
          this.alert["oil_gear"] = this.mile - docSnap.oil_gear;
          this.alert["back_gear"] = this.mile - docSnap.back_gear;
          this.alert["car_tires"] = this.mile - docSnap.car_tires;
          this.alert["oil_power"] = this.mile - docSnap.oil_power;

          this.alert_per["oil_engine"] = this.clamp(
            (this.alert["oil_engine"] / this.oil_engine[this.oilEngine]) * 100,
            0,
            100
          );

          this.alert_per["break"] = this.clamp(
            (this.alert["break"] / 40000) * 100,
            0,
            100
          );

          this.alert_per["oil_gear"] = this.clamp(
            (this.alert["oil_gear"] / 40000) * 100,
            0,
            100
          );

          this.alert_per["back_gear"] = this.clamp(
            (this.alert["back_gear"] / 40000) * 100,
            0,
            100
          );

          this.alert_per["car_tires"] = this.clamp(
            (this.alert["car_tires"] / 50000) * 100,
            0,
            100
          );

          this.alert_per["oil_power"] = this.clamp(
            (this.alert["oil_power"] / 80000) * 100,
            0,
            100
          );

          this.alert["air_filter"] = CurrentDate.diff(
            moment(docSnap.air_filter),
            "months"
          );
          this.alert["passenger_air_filter"] = CurrentDate.diff(
            moment(docSnap.passenger_air_filter),
            "months"
          );
          this.alert["rain_rubber"] = CurrentDate.diff(
            moment(docSnap.rain_rubber),
            "months"
          );
          this.alert["battery"] = CurrentDate.diff(
            moment(docSnap.battery),
            "months"
          );

          this.alert_per["air_filter"] = this.clamp(
            (CurrentDate.diff(moment(docSnap.air_filter), "months") /
              moment(docSnap.air_filter)
                .add(12, "M")
                .diff(moment(docSnap.air_filter), "months")) *
              100,
            0,
            100
          );

          this.alert_per["passenger_air_filter"] = this.clamp(
            (CurrentDate.diff(moment(docSnap.passenger_air_filter), "months") /
              moment(docSnap.passenger_air_filter)
                .add(6, "M")
                .diff(moment(docSnap.passenger_air_filter), "months")) *
              100,
            0,
            100
          );
          this.alert_per["rain_rubber"] = this.clamp(
            (CurrentDate.diff(moment(docSnap.rain_rubber), "months") /
              moment(docSnap.rain_rubber)
                .add(12, "M")
                .diff(moment(docSnap.rain_rubber), "months")) *
              100,
            0,
            100
          );

          this.alert_per["battery"] = this.clamp(
            (CurrentDate.diff(moment(docSnap.battery), "months") /
              moment(docSnap.battery)
                .add(24, "M")
                .diff(moment(docSnap.battery), "months")) *
              100,
            0,
            100
          );

          this.alert["third_insurance_expire"] = CurrentDate.diff(
            moment(docSnap.third_insurance_expire).subtract(12, "M"),
            "months"
          );
          this.alert_per["third_insurance_expire"] = this.clamp(
            (CurrentDate.diff(
              moment(docSnap.third_insurance_expire).subtract(12, "M"),
              "months"
            ) /
              moment(docSnap.third_insurance_expire).diff(
                moment(docSnap.third_insurance_expire).subtract(12, "M"),
                "months"
              )) *
              100,
            0,
            100
          );
          this.alert["insurance_expire"] = docSnap.insurance_expire
            ? CurrentDate.diff(
                moment(docSnap.insurance_expire).subtract(12, "M"),
                "months"
              )
            : 0;
          this.alert_per["insurance_expire"] = docSnap.insurance_expire
            ? this.clamp(
                (CurrentDate.diff(
                  moment(docSnap.insurance_expire).subtract(12, "M"),
                  "months"
                ) /
                  moment(docSnap.insurance_expire).diff(
                    moment(docSnap.insurance_expire).subtract(12, "M"),
                    "months"
                  )) *
                  100,
                0,
                100
              )
            : 0;

          this.alert_per_sorted = Object.keys(this.alert_per).sort(
            (a, b) => this.alert_per[b] - this.alert_per[a]
          );
        });
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MainPage");
    setTimeout(() => {
      this.plt.ready().then(() => {
        this.loaduserProfile();
        bluetoothSerial.enable(
          () => {
            console.log("enable");
            //this.start();
          },
          () => {
            console.log("didnot enable");
            let alert = this.alertCtrl.create({
              title: "WARNING",
              subTitle: "Please Enable Bluetooth",
              buttons: ["Dismiss"]
            });
            alert.present();
          }
        );

        this.pauseSub = this.plt.pause.subscribe(() => {
          console.log("PAUSE WORKING!!!!");
          if (this.counter_temp > 0) {
            this.updateMile(parseInt(this.mile) + this.counter_temp);
            this.counter_temp = 0;
          }
        });
        this.resumeSub = this.plt.resume.subscribe(() => {
          console.log("RESUME WORKING!!!!");
          if (this.connected === false) {
            this.start();
          }
        });
      });
    }, 1000);
  }

  updateMile(newValue: number) {
    var colRef = this.afs
      .collection("Users")
      .doc(this.auth.getcurrentUser().uid)
      .collection("Cars")
      .doc(this.carID);
    var updateSingle = colRef.update({ car_mile: Math.ceil(newValue) });
  }

  ionViewDidEnter() {
    /*this.connectInverval=setInterval(() => {
                this.start();
       }, 10000);*/
  }

  readMile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection("Users")
        .doc(this.auth.getcurrentUser().uid)
        .collection("Cars")
        .ref.get()
        .then(docs => {
          docs.forEach(x => {
            let data = x.data();
            resolve({
              mile: data.car_mile,
              last_visit: data.last_visit,
              engine_oil: data.engine_oil,
              third_insurance_expire: data.third_insurance_expire,
              insurance_expire: data.insurance_expire
            });
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  editOdoAlert() {
    let alert = this.alertCtrl.create({
      title: "แก้ไขเลขไมล์สะสม",
      inputs: [
        {
          name: "odemeter",
          placeholder: "เลขไมล์สะสม"
        }
      ],
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "บันทึก",
          handler: data => {
            if (data.odemeter) {
              if (data.odemeter >= this.mile) {
                var colRef = this.afs
                  .collection("Users")
                  .doc(this.auth.getcurrentUser().uid)
                  .collection("Cars")
                  .doc(this.carID);
                var updateSingle = colRef.update({ car_mile: data.odemeter });
              } else {
                let alert = this.alertCtrl.create({
                  title: "ERROR",
                  subTitle: "กรุณาใส่เลขไมล์สะสมที่มากขึ้น!",
                  buttons: ["OK"]
                });
                alert.present();
              }
            }
          }
        }
      ]
    });
    alert.setMode("ios");
    alert.present();
  }

  editkmAlert(field) {
    let alert = this.alertCtrl.create({
      title: `แก้ไขเลขไมล์ที่เปลี่ยน ${this.alert_name[field]}`,
      inputs: [
        {
          name: "odemeter",
          placeholder: "เลขไมล์",
          value: this.mile
        }
      ],
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "บันทึก",
          handler: data => {
            if (data.odemeter) {
              if (data.odemeter <= this.mile) {
                var colRef = this.afs
                  .collection("Users")
                  .doc(this.auth.getcurrentUser().uid)
                  .collection("Cars")
                  .doc(this.carID);
                var updateSingle = colRef.update({ [field]: data.odemeter });
              } else {
                let alert = this.alertCtrl.create({
                  title: "ERROR",
                  subTitle: "เลขไมล์ที่เปลี่ยนห้ามเกินเลขไมล์สะสม",
                  buttons: ["OK"]
                });
                alert.present();
              }
            }
          }
        }
      ]
    });
    alert.setMode("ios");
    alert.present();
  }

  getFormatDate() {
    var dateObj = new Date();

    var year = dateObj.getFullYear().toString();
    var month = dateObj.getMonth().toString();
    var date = dateObj.getDate().toString();

    var monthArray = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];

    this.formatDate = date + "/" + monthArray[month] + "/" + year;
  }

  updateData(name) {
    if (this.alert_type[name] != "กิโลเมตร") {
      let alert = this.alertCtrl.create({
        title:
          this.alert_name[name] === "ประกันภัยภาคสมัครใจ" ||
          this.alert_name[name] === "ต่อภาษีรถยนต์"
            ? "หมดอายุวันที่"
            : "วันที่เปลี่ยน",
        inputs: [
          {
            name: "update_date",
            placeholder: this.formatDate,
            type: "date"
          }
        ],
        buttons: [
          {
            text: "ยกเลิก",
            role: "cancel",
            handler: data => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "บันทึก",
            handler: data => {
              if (data.update_date) {
                var colRef = this.afs
                  .collection("Users")
                  .doc(this.auth.getcurrentUser().uid)
                  .collection("Cars")
                  .doc(this.carID);
                var updateSingle = colRef.update({ [name]: data.update_date });
              }
            }
          }
        ]
      });
      alert.setMode("ios");
      alert.present();
    } else {
      this.editkmAlert(name);
    }
  }
}
