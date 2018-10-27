import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { User } from '../../providers/user/user';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    loginForm: FormGroup;
	loginError: string;
    //loginForm: FormGroup;
    //loading: Loading;
    //account = {email: '', password: ''};

    /*fieldName: any = {
        email: 'email',
        password: 'password'
    };*/
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  // Our translated text strings
  //private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    //public formCtrl: Form,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    private auth: AuthService,
    fb: FormBuilder,
    private readonly afs: AngularFirestore
    ) {

    /*this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
  });*/

    this.loginForm = fb.group({
        email: [''],
        password: ['']
    });

    /*this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
  });*/
  }

  /*ionViewDidLoad() {
    // this.user.checkUser();
    let d = {
      "email" : "a@a.com",
      "password" : "ionic"
    }
    // this.user.login(d)
    this.user.login(d).subscribe((resp) => {
      console.log(resp)
    })
  }*/

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
      this.auth.signInWithEmail(credentials) .then(
          () => this.gotoMainPage(),
          error => this.loginError = error.message
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

  gotoMainPage () {
    let currentUser = this.auth.getcurrentUser();
    this.afs.collection('Users').doc(currentUser.uid).collection('Cars').ref.get()
    .then( (query)=>

      {
        if(query.size>0){
            this.navCtrl.push('MainPage');
        }else{
            this.navCtrl.push('StartQuestionnairePage');
        }

    });
  }
  // Attempt to login in through our User service
  gotoSignUp() {
      this.navCtrl.push('SignupPage');
  }
}
