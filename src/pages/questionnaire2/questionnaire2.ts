import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

/**
 * Generated class for the Questionnaire2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-questionnaire2",
  templateUrl: "questionnaire2.html"
})
export class Questionnaire2Page {
  public user: any;
  questionnaireForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    fb: FormBuilder,
    private auth: AuthService
  ) {
    this.questionnaireForm = fb.group({
      car_mile: [this.navParams.data.car_mile || "", Validators.required],
      last_visit: [this.navParams.data.last_visit || "", Validators.required],
      service_center: [
        this.navParams.data.service_center || "",
        Validators.required
      ],
      engine_oil: [this.navParams.data.engine_oil || "", Validators.required]
    });
    this.user = this.auth.getcurrentUser();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Questionnaire2Page");
  }

  goToQuestionnaire3() {
    let data = Object.assign(
      {},
      this.navParams.data,
      this.questionnaireForm.value
    );
    this.navCtrl.push("Questionnaire3Page", data);
  }

  goToQuestionnaire1() {
    this.navCtrl.pop();
  }
}
