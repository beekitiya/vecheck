import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { resolveDefinition } from '@angular/core/src/view/util';
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

    public cars : any;
    public models : any;
    public engines: any;
    public years: any;
    brand: string;
    model: string;
    year: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    fb: FormBuilder,
    private readonly afs: AngularFirestore) {
      this.questionnaireForm = fb.group({
        car_name: ['',Validators.required],
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

  async ionViewDidLoad() {
    console.log('ionViewDidLoad Questionnaire1Page');
    await this.readBrands().then(out=>{
      this.cars=out;});
  }

  getModel(brand: string): void{
    this.models=this.cars[brand].map(x=>x.model);
    this.brand=brand;
  }

  getYear(model: string): void{
    this.model=model;
    this.years=this.cars[this.brand].filter(x=>x.model==model)[0].engine;
  }

  getEngine(year: string): void{
    this.year=year;
    let result=this.cars[this.brand].filter(x=>x.model==this.model)[0].engine[year];
    typeof result === 'object' ? this.engines=result : this.engines=[result]
  }
  readBrands(): Promise<any>{
      return new Promise((resolve, reject) => {
    var brandCollect = this.afs.collection('CarBrands');
  var getDoc = brandCollect.ref.get()
    .then(docs => {
      let obj : any = {};
      docs.forEach(doc => {
        obj[doc.id]=[]
        doc.data().Models.forEach(model=>{
          this.readModels(doc.id,model).then(out=>{
            obj[doc.id].push({model, engine: out});
          })
        })
      });
      resolve(obj);
    })
    .catch(err => {
      reject(err);
    });
  });

}

readModels(brand: string, model: string): Promise<any>{
  return new Promise((resolve, reject) => {
    var brandCollect = this.afs.collection('CarBrands');
  brandCollect.doc(brand).collection(model).ref.get().then(m_docs =>{
    let obj : any = {};
    m_docs.forEach(doc => {
      obj=doc.data();
    })
    resolve(obj);
  }).catch(err => {
    reject(err);
  });;
});
}
  goToQuestionnaire2() {
      let data = this.questionnaireForm.value;
      this.navCtrl.push('Questionnaire2Page',data);
  }



}
