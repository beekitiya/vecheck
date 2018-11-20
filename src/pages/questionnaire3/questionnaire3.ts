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
    this.navCtrl.push("MainPage");
  }
  createcarProfile(value) {
    if (value["insurance"] === "ไม่สมัคร") {
      delete value["insurance_expire"];
    }
    if (value.id) {
<<<<<<< HEAD
      delete value["break"];
      delete value["oil_gear"];
      delete value["back_gear"];
      delete value["car_tires"];
      delete value["oil_power"];
=======
        delete value["break"];
        delete value["oil_gear"];
        delete value["back_gear"];
        delete value["car_tires"];
        delete value["oil_power"];
>>>>>>> fbd570f2982a8949516c3202217cd16e5d0e942c
    }
    if (!Object.keys(value).every(o => value[o] != null && value[o] != "")) {
      let alert = this.alertCtrl.create({
        title: "ERROR",
<<<<<<< HEAD
        subTitle: "Please Fill in information!",
=======
        subTitle: "กรุณากรอกข้อมูลให้ครบ",
>>>>>>> fbd570f2982a8949516c3202217cd16e5d0e942c
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
