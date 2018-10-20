import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Questionnaire1Page } from '../questionnaire1/questionnaire1';

/**
 * Generated class for the StartQuestionnairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start-questionnaire',
  templateUrl: 'start-questionnaire.html',
})
export class StartQuestionnairePage {

    questionnaire1: Questionnaire1Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartQuestionnairePage');
  }

  goToQuestionnaire1() {
      this.navCtrl.push('Questionnaire1Page');
  }

}
