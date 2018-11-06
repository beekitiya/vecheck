import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    fb: FormBuilder,
    private auth: AuthService,
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
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Questionnaire3Page");
    console.log(this.navParams.data);
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
