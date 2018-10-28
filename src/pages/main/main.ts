import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';

var wifiOBDReader;
declare var require: any;
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
    oil_engine = {'0':7500,'1':5000,'2':10000};
    alert={};

  constructor(public navCtrl: NavController, public navParams: NavParams,private ngZone: NgZone, public plt: Platform, public alertCtrl: AlertController,
    private readonly afs: AngularFirestore,
    private auth: AuthService,) {
      var OBDReader = require('obd-bluetooth-tcp');
      wifiOBDReader = new OBDReader();
      var instance = this;
      this.counter=0;
      this.readMile().then(out=>{
        var CurrentDate = moment(new Date());


        this.mile=out.mile;
        this.last_visit=parseInt(out.last_visit.split('-')[1]);
        this.oilEngine=out.engine_oil;

        this.alert['oil_engine']=this.oil_engine[this.oilEngine]-(this.mile%this.oil_engine[this.oilEngine]);
        this.alert['break']=40000-(this.mile%40000);
        this.alert['oil_gear']=40000-(this.mile%40000);
        this.alert['back_gear']=40000-(this.mile%40000);
        this.alert['car_tires']=50000-(this.mile%50000);
        this.alert['oil_power']=80000-(this.mile%80000);
        this.alert['air_filter']=12-this.last_visit;
        this.alert['passenger_air_filter']=6-this.last_visit;
        this.alert['rain_rubber']=12-this.last_visit;
        this.alert['battery']=24-this.last_visit;
        this.alert['car_tax']=moment(out.third_insurance_expire).diff(CurrentDate,'days');
        this.alert['car_insurance']=moment(out.insurance_expire).diff(CurrentDate,'days');


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
          setTimeout(() => {
            instance.ngZone.run(()=>{
                instance.Speed=kph;
                instance.counter+=(kph/3600);
                instance.Distance=instance.counter.toFixed(2);
            })
        }, 0);
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
              console.log('Save clicked');
            }
          }
        ]
      });
      alert.setMode('ios');
      alert.present();
    }
}
