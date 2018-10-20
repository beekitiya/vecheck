import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

var wifiOBDReader;

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
    speed: string = "";
    temp: string = "";
    Speed: number;
    counter: number;
    Distance: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,private ngZone: NgZone, public plt: Platform) {
      var OBDReader = require('obd-bluetooth-tcp');
      wifiOBDReader = new OBDReader();
      var instance = this;
      this.counter=0;

      wifiOBDReader.on('debug', function (data) { console.log("=>APP DEBUG:" + data) });
      wifiOBDReader.on('error', function (data) {
          console.log("=>APP ERROR:" + data)
      });
    wifiOBDReader.on('dataReceived', function (data) {
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
      //wifiOBDReader.setProtocol(0);
        //wifiOBDReader.autoconnect("TCP", this.host);
      wifiOBDReader.autoconnect("bluetooth", "obd");
    }); // ready
  }

  stop() {
    this.plt.ready().then(() => {
      wifiOBDReader.removeAllPollers();
      wifiOBDReader.disconnect();
      wifiOBDReader.stopPolling();
      console.log("=======>ON STOP WE HAVE " + wifiOBDReader.getNumPollers() + " pollers");
    });
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
  myRand: number;


  ionViewDidEnter() {
    setInterval(() => {
               this.ngZone.run(()=>{
                   this.myRand=this.random();
               })
       }, 5000);

    }

   random(): number {
     let rand = Math.floor(Math.random()*20)+1;
     return rand;
  }

}
