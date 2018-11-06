import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../../services/auth.service";
import { resolveDefinition } from "@angular/core/src/view/util";
/**
 * Generated class for the Questionnaire1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-questionnaire1",
  templateUrl: "questionnaire1.html"
})
export class Questionnaire1Page {
  questionnaireForm: FormGroup;
  public user: any;
  public cars: any;
  public models: any;
  public engines: any;
  public years: any;
  brand: string;
  model: string;
  year: string;
  car_profile: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    fb: FormBuilder,
    private readonly afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.questionnaireForm = fb.group({
      car_name: ["", Validators.required],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      model_year: ["", Validators.required],
      model_color: ["", Validators.required],
      model_engine: ["", Validators.required],
      model_gear: ["", Validators.required],
      model_country: ["", Validators.required],
      model_license: ["", Validators.required]
    });
    this.loadBrands();
  }
  async loadBrands() {
    this.cars = await this.readBrands();
    setTimeout(() => {
      if (this.auth.getcurrentUser()) {
        this.user = this.auth.getcurrentUser();
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
              this.questionnaireForm.patchValue({
                car_name: docSnap.car_name,
                brand: docSnap.brand,
                model: docSnap.model,
                model_year: docSnap.model_year,
                model_color: docSnap.model_color,
                model_engine: docSnap.model_engine,
                model_gear: docSnap.model_gear,
                model_country: docSnap.model_country,
                model_license: docSnap.model_license
              });
              this.car_profile = { ...docSnap };
              this.getModel(docSnap.brand);
              this.getYear(docSnap.model);
              this.getEngine(docSnap.model_year);
            });
          });
      }
  }, 1500);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Questionnaire1Page");
  }

  getModel(brand: string): void {
    this.models = this.cars[brand].map(x => x.model).sort();
    this.brand = brand;
  }

  getYear(model: string): void {
    this.model = model;
    this.years = this.cars[this.brand].filter(x => x.model == model)[0].engine;
  }

  getEngine(year: string): void {
    this.year = year;
    let result = this.cars[this.brand].filter(x => x.model == this.model)[0]
      .engine[year];
    typeof result === "object"
      ? (this.engines = result)
      : (this.engines = [result]);
  }
  readBrands(): Promise<any> {
    return new Promise((resolve, reject) => {
      var brandCollect = this.afs.collection("CarBrands");
      var getDoc = brandCollect.ref
        .get()
        .then(docs => {
          let obj: any = {};
          let out: any = {};
          docs.forEach(doc => {
            obj[doc.id] = [];
            doc.data().Models.forEach(async model => {
              out = await this.readModels(doc.id, model);
              obj[doc.id].push({ model, engine: out });
            });
          });
          resolve(obj);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  readModels(brand: string, model: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var brandCollect = this.afs.collection("CarBrands");
      brandCollect
        .doc(brand)
        .collection(model)
        .ref.get()
        .then(m_docs => {
          let obj: any = {};
          m_docs.forEach(doc => {
            obj = doc.data();
          });
          resolve(obj);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  goToQuestionnaire2() {
    let data = {};
    if (this.car_profile) {
      data = Object.assign({}, this.car_profile, this.questionnaireForm.value);
    } else {
      data = this.questionnaireForm.value;
    }
    this.navCtrl.push("Questionnaire2Page", data);
  }
}
