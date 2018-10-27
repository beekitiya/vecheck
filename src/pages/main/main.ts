import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private ngZone: NgZone, public plt: Platform, public alertCtrl: AlertController) {
      var OBDReader = require('obd-bluetooth-tcp');
      wifiOBDReader = new OBDReader();
      var instance = this;
      this.counter=0;

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
