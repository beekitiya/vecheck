import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Questionnaire2Page } from '../questionnaire2/questionnaire2'

/**
 * Generated class for the Questionnaire1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionnaire1',
  templateUrl: 'questionnaire1.html',
})
export class Questionnaire1Page {

    questionnaire2Page: Questionnaire2Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Questionnaire1Page');
  }

  goToQuestionnaire2() {
      this.navCtrl.push('Questionnaire2Page');
  }

}
