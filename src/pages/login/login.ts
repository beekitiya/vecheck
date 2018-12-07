import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  IonicPage,
  NavController,
  ToastController,
  ViewController,
  Platform,
  AlertController
} from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../../providers/user/user";
import { SignupPage } from "../signup/signup";
import { MainPage } from "../main/main";
import { AngularFirestore } from "angularfire2/firestore";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  // Our translated text strings
  //private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    //public formCtrl: Form,
    public plt: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    private auth: AuthService,
    fb: FormBuilder,
    private readonly afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.loginForm = fb.group({
      email: [""],
      password: [""]
    });

    /*this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
  });*/
  }

  login() {
    /*if (this.loginForm.invalid) {
          this.formCtrl.validateForm(this.loginForm.controls, this.account.login);
          return console.error('Invalid form');
        }

        return this.user.login(this.loginForm.value).then(() => {
          this.navCtrl.push('MainPage');
      });*/
    /*this.user.login(this.account).subscribe((resp) => {
          if (resp) {
              this.navCtrl.push('MainPage');
          } else {
              this.showError("Username or Password incorrect");
          }
      }, error => {
          this.showError(error.message);
      });*/
    let data = this.loginForm.value;
    if (!data.email) {
      return;
    }
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials).then(
      () => this.navCtrl.setRoot("MainPage"),
      error => {
        let alert = this.alertCtrl.create({
          title: "ERROR",
          subTitle: error.message,
          buttons: ["Dismiss"]
        });
        alert.present();
      }
    );
  }

  /*showError(text) {
      //this.loading.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Unable',
          subTitle: text,
          buttons: ['OK']
      });
      //alert.present(prompt);
  }*/

  gotoMainPage() {
    //this.navCtrl.push("MainPage");
  }
  // Attempt to login in through our User service
  gotoSignUp() {
    this.navCtrl.push("SignupPage");
  }
}
