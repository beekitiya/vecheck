import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';

var wifiOBDReader;
declare var require: any;
declare var bluetoothSerial:any;
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})


export class MainPage {

    //host: string = "192.168.0.10:35000"; // ip:port 192.168.0.10:35000
    wifiOBDReader: any;
    connectInverval: any;
    connected: boolean = false;
    speed: string = "";
    temp: string = "";
    Speed: number;
    counter: number;
    Distance: string = "";
    last_visit: number;
    mile: any;
    oilEngine: any;
    carID: any;
    oil_engine = {'0':7500,'1':5000,'2':10000};
    alert={};
    alert_per={};
    alert_per_sorted=[];
    alert_name={'oil_engine':'น้ำมันเครื่อง','break':'ผ้าเบรค','car_tires':'ยางล้อรถยนต์','car_tax':'ต่อภาษีรถยนต์','oil_power':'น้ำมันพาเวอร์ / น้ำมันเบรค',
    'rain_rubber':'ยางในปัดน้ำฝน','battery':'แบตเตอรี่ + น้ำกลั่นในแบตเตอรี่ + กำลังไฟแบตเตอรี่','car_insurance':'ประกันภัยภาคสมัครใจ','passenger_air_filter':'กรองอากาศแอร์ในห้องโดยสาร','air_filter':'กรองอากาศเครื่องยนต์','oil_gear':'น้ำมันเกียร์','back_gear':'น้ำมันเฟืองท้าย'};
    alert_type={'oil_engine':'กิโลเมตร','break':'กิโลเมตร','car_tires':'กิโลเมตร','car_tax':'วัน','oil_power':'กิโลเมตร',
    'rain_rubber':'เดือน','battery':'เดือน','car_insurance':'วัน','passenger_air_filter':'เดือน','air_filter':'เดือน','oil_gear':'กิโลเมตร','back_gear':'กิโลเมตร'}

    clamp(n: number,min: number, max: number) {
  return Math.max(min, Math.min(n, max));
    }

  constructor(public navCtrl: NavController, public navParams: NavParams,private ngZone: NgZone, public plt: Platform, public alertCtrl: AlertController,
    private readonly afs: AngularFirestore,
    private auth: AuthService,) {
      var OBDReader = require('obd-bluetooth-tcp');
      wifiOBDReader = new OBDReader();
      var instance = this;
      this.counter=0;

      var doc = this.afs.collection('Users').doc('E5rUWddcGifXCueIFPmMFi0cNZl2').collection('Cars')
      doc.snapshotChanges().map(actions => {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
}).subscribe((querySnapshot) => {
    querySnapshot.forEach((docSnap:any) => {

        var CurrentDate = moment(new Date());
        this.mile=docSnap.car_mile;
        this.last_visit=parseInt(docSnap.last_visit.split('-')[1]);
        this.oilEngine=docSnap.engine_oil;
        this.carID=docSnap.id;
        this.alert['oil_engine']=(this.mile%this.oil_engine[this.oilEngine]);
        this.alert_per['oil_engine']=(this.mile%this.oil_engine[this.oilEngine])/this.oil_engine[this.oilEngine]*100;
        this.alert['break']=(this.mile%40000);
        this.alert_per['break']=(this.mile%40000)/40000*100;
        this.alert['oil_gear']=(this.mile%40000);
        this.alert_per['oil_gear']=(this.mile%40000)/40000*100;
        this.alert['back_gear']=(this.mile%40000);
        this.alert_per['back_gear']=(this.mile%40000)/40000*100;
        this.alert['car_tires']=(this.mile%50000);
        this.alert_per['car_tires']=(this.mile%50000)/50000*100;
        this.alert['oil_power']=(this.mile%80000);
        this.alert_per['oil_power']=(this.mile%80000)/80000*100;
        this.alert['air_filter']=this.last_visit;
        this.alert_per['air_filter']=this.clamp(this.last_visit/12*100,0,100);
        this.alert['passenger_air_filter']=6-this.last_visit;
        this.alert_per['passenger_air_filter']=this.clamp(this.last_visit/6*100,0,100);
        this.alert['rain_rubber']=this.last_visit;
        this.alert_per['rain_rubber']=this.clamp(this.last_visit/12*100,0,100);
        this.alert['battery']=this.last_visit;
        this.alert_per['battery']=this.clamp(this.last_visit/24*100,0,100);
        this.alert['car_tax']=365-moment(docSnap.third_insurance_expire).diff(CurrentDate,'days');
        this.alert_per['car_tax']=this.clamp((365-moment(docSnap.third_insurance_expire).diff(CurrentDate,'days'))/365*100,0,100);
        this.alert['car_insurance']=365-moment(docSnap.insurance_expire).diff(CurrentDate,'days');
        this.alert_per['car_insurance']=this.clamp((365-moment(docSnap.insurance_expire).diff(CurrentDate,'days'))/365*100,0,100);
        this.alert_per_sorted = Object.keys(this.alert_per).sort((a,b)=>this.alert_per[b]-this.alert_per[a]);
        console.log(this.alert_per,this.alert_per_sorted);
    });
});

      wifiOBDReader.on('debug', function (data) { console.log("=>APP DEBUG:" + data) });
      wifiOBDReader.on('error', function (data) {
          /*instance.connectInverval=setInterval(() => {
                     instance.start();
            }, 10000);
            instance.connected=false;*/
          console.log("=>APP ERROR:" + data)
          wifiOBDReader.autoconnect("bluetooth", "OBD");
      });
    wifiOBDReader.on('dataReceived', function (data) {
        //instance.stopClear();
      console.log("=>APP: Received Data=" + JSON.stringify(data));

      if (data.name && data.name == 'vss') {
          let kph  = Math.round(data.value); // convert to mph
            instance.ngZone.run(()=>{
                instance.Speed=kph;
                instance.counter+=(kph/3600);
                instance.Distance=instance.counter.toFixed(2);
            })
        }
    })

    wifiOBDReader.on('connected', function () {
      console.log("=>APP: Connected");
      instance.connected=true;
      //clearInterval(this.connectInverval);
      this.stopPolling();
      this.removeAllPollers();
      this.addPoller("vss"); // 0,220 mph
      console.log("=======>ON START WE HAVE " + this.getNumPollers() + " pollers");
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
      this.connected=false;
      wifiOBDReader.stopPolling();
      console.log("=======>ON STOP WE HAVE " + wifiOBDReader.getNumPollers() + " pollers");
    });
  }

  stopClear() {
      clearInterval(this.connectInverval);
      console.log("clear interval");
  }

  sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');

    setTimeout(() => {
    this.plt.ready().then(() => {
        bluetoothSerial.enable(
            ()=>{
                console.log('enable');
                this.start();
            },()=>{
                console.log('didnot enable');
                let alert = this.alertCtrl.create({
                    title: 'WARNING',
                    subTitle: 'Please Enable Bluetooth',
                    buttons: ['Dismiss']
                });
                alert.present();
            }
        )
    })},3000);
}


  ionViewDidEnter() {
    /*this.connectInverval=setInterval(() => {
                this.start();
       }, 10000);*/

   }

   readMile(): Promise<any>{
    return new Promise((resolve, reject) => {
      let currentUser = this.auth.getcurrentUser();
      this.afs.collection('Users').doc('E5rUWddcGifXCueIFPmMFi0cNZl2').collection('Cars').ref.get()
  .then(docs => {
    docs.forEach(x=>{
      let data = x.data()
      resolve({'mile':data.car_mile,'last_visit':data.last_visit,'engine_oil':data.engine_oil,'third_insurance_expire':data.third_insurance_expire,'insurance_expire':data.insurance_expire});
    })

  })
  .catch(err => {
    reject(err);
  });
});

}

   editOdoAlert() {
      let alert = this.alertCtrl.create({
        title: 'แก้ไขเลขไมล์สะสม',
        inputs: [
          {
            name: 'odemeter',
            placeholder: 'เลขไมล์สะสม'
          }
        ],
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'บันทึก',
            handler: data => {
              var colRef = this.afs.collection('Users').doc('E5rUWddcGifXCueIFPmMFi0cNZl2').collection('Cars').doc(this.carID)
              var updateSingle = colRef.update({'car_mile': data.odemeter});

            }
          }
        ]
      });
      alert.setMode('ios');
      alert.present();
    }
}
