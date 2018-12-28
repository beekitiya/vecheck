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
import { m } from "@angular/core/src/render3";

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

  selectInsurance(input: String) {
    if (input === "ไม่สมัคร") {
      this.questionnaireForm.controls["insurance_expire"].disable();
    } else {
      this.questionnaireForm.controls["insurance_expire"].enable();
    }
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
    const { model, model_engine, model_license, model_year, brand } = value;

    if (
      model === "" ||
      model_engine === "" ||
      model_license === "" ||
      model_year === "" ||
      brand === ""
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
      if (value.car_mile) {
        let mile = parseFloat(value.car_mile);
        if (!("oil_engine" in value)) {
          value["oil_engine"] =
            Math.floor(mile / this.oil_engine[value.engine_oil]) *
            this.oil_engine[value.engine_oil];
        }
        if (!("break" in value)) {
          value["break"] = Math.floor(mile / 40000) * 40000;
        }
        if (!("oil_gear" in value)) {
          value["oil_gear"] = Math.floor(mile / 40000) * 40000;
        }
        if (!("back_gear" in value)) {
          value["back_gear"] = Math.floor(mile / 40000) * 40000;
        }
        if (!("car_tires" in value)) {
          value["car_tires"] = Math.floor(mile / 50000) * 50000;
        }
        if (!("oil_power" in value)) {
          value["oil_power"] = Math.floor(mile / 80000) * 80000;
        }
      }
      if (value.last_visit) {
        let lastvisit = value.last_visit;
        if (!("air_filter" in value)) {
          value["air_filter"] = lastvisit;
        }
        if (!("passenger_air_filter" in value)) {
          value["passenger_air_filter"] = lastvisit;
        }
        if (!("rain_rubber" in value)) {
          value["rain_rubber"] = lastvisit;
        }
        if (!("battery" in value)) {
          value["battery"] = lastvisit;
        }
        if (!("coolant_water" in value)) {
          value["coolant_water"] = lastvisit;
        }
        if (!("tires" in value)) {
          value["tires"] = lastvisit;
        }
      }
      if (value["insurance"] === "ไม่สมัคร") {
        value["insurance_expire"] = "";
      }
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
