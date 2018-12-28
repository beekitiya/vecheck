import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { MainPage } from "../";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

/**
 * Generated class for the Questionnaire3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-questionnaire3",
  templateUrl: "questionnaire3.html"
})
export class Questionnaire3Page {
  questionnaireForm: FormGroup;
  oil_engine = { "0": 7500, "1": 5000, "2": 10000 };
  public user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    fb: FormBuilder,
    private auth: AuthService,
    public alertCtrl: AlertController,
    private readonly afs: AngularFirestore
  ) {
    this.questionnaireForm = fb.group({
      insurance_expire: [
        this.navParams.data.insurance_expire || "",
        Validators.required
      ],
      insurance: [this.navParams.data.insurance || "", Validators.required],
      third_insurance_expire: [
        this.navParams.data.third_insurance_expire || "",
        Validators.required
      ],
      car_tax_expire: [
        this.navParams.data.car_tax_expire || "",
        Validators.required
      ]
    });
    this.user = this.auth.getcurrentUser();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Questionnaire3Page");
  }

  writeData() {
    let data = Object.assign(
      {},
      this.navParams.data,
      this.questionnaireForm.value
    );
    this.createcarProfile(data);
  }

  gotoMainPage() {
    this.navCtrl.setRoot("MainPage");
  }
  createcarProfile(value) {
    const {
      car_name,
      model,
      model_engine,
      car_mile,
      last_visit,
      model_license,
      model_year,
      brand
    } = value;
    if (
      car_name !== "" &&
      model !== "" &&
      model_engine !== "" &&
      car_mile !== "" &&
      last_visit !== "" &&
      model_license !== "" &&
      model_year !== "" &&
      brand !== ""
    ) {
      let alert = this.alertCtrl.create({
        title: "ERROR",
        subTitle: "กรุณากรอกข้อมูลให้ครบ",
        buttons: ["OK"]
      });
      alert.present();
      return;
    }
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.auth.getcurrentUser();
      if (value.id) {
        this.afs
          .collection("Users")
          .doc(currentUser.uid)
          .collection("Cars")
          .doc(value.id)
          .update({
            ...value
          })
          .then(
            res => {
              this.gotoMainPage();
              resolve(res);
            },
            err => reject(err)
          );
      } else {
        if (value.car_mile) {
          let mile = parseFloat(value.car_mile);
          value["oil_engine"] =
            Math.floor(mile / this.oil_engine[value.engine_oil]) *
            this.oil_engine[value.engine_oil];
          value["break"] = Math.floor(mile / 40000) * 40000;
          value["oil_gear"] = Math.floor(mile / 40000) * 40000;
          value["back_gear"] = Math.floor(mile / 40000) * 40000;
          value["car_tires"] = Math.floor(mile / 50000) * 50000;
          value["oil_power"] = Math.floor(mile / 80000) * 80000;
        }
        if (value.last_visit) {
          let lastvisit = value.last_visit;
          value["air_filter"] = lastvisit;
          value["passenger_air_filter"] = lastvisit;
          value["rain_rubber"] = lastvisit;
          value["battery"] = lastvisit;
          value["coolant_water"] = lastvisit;
          value["tires"] = lastvisit;
        }
        this.afs
          .collection("Users")
          .doc(currentUser.uid)
          .collection("Cars")
          .add({
            ...value
          })
          .then(
            res => {
              this.gotoMainPage();
              resolve(res);
            },
            err => reject(err)
          );
      }
    });
  }

  goToQuestionnaire2() {
    this.navCtrl.pop();
  }
}
