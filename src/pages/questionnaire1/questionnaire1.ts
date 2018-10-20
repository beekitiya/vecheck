import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    questionnaireForm: FormGroup;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    fb: FormBuilder) {
      this.questionnaireForm = fb.group({
        brand: ['',Validators.required],
        model: ['',Validators.required],
        model_year: ['',Validators.required],
        model_color: ['',Validators.required],
        model_engine: ['',Validators.required],
        model_gear: ['',Validators.required],
        model_country: ['',Validators.required],
        model_license: ['',Validators.required]
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Questionnaire1Page');
  }

  goToQuestionnaire2() {
      let data = this.questionnaireForm.value;
      this.navCtrl.push('Questionnaire2Page',data);
  }



}
