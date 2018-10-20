import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Questionnaire3Page } from '../questionnaire3/questionnaire3'

/**
 * Generated class for the Questionnaire2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionnaire2',
  templateUrl: 'questionnaire2.html',
})
export class Questionnaire2Page {

    questionnaire3Page: Questionnaire3Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Questionnaire2Page');
  }

  goToQuestionnaire3() {
      this.navCtrl.push('Questionnaire3Page');
  }


}
