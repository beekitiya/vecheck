import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import { User } from '../../providers';
import { LoginPage } from '../login/login'
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
    signupError: string;
	signupForm: FormGroup;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public aleCtrl: AlertController,
    public navParams: NavParams,
    fb: FormBuilder,
    private auth: AuthService,
    private readonly afs: AngularFirestore
    ) {

        this.signupForm = fb.group({
            username: [''],
            email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
			password: ['',[Validators.required, Validators.minLength(6)]],
            confirm_password: ['',[Validators.required, Validators.minLength(6)]],
            lineid: [''],
            phonenumber: [''],
            gender: ['']
    	}, {
            validator: this.MatchPassword // Inject the provider method
        });
  }

  private MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value // to get value in input tag
       const confirm_password = AC.get('confirm_password').value // to get value in input tag
        if(password != confirm_password) {
            console.log('false');
            AC.get('password').setErrors( { MatchPassword: true } )
        } else {
            console.log('true')
            AC.get('password').setErrors(null);
        }
}

  signup() {
    // Attempt to login in through our User service
    let data = this.signupForm.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			() => {
                 this.createProfile(data);
                },
			error => this.signupError = error.message
		);
  }

  createProfile(value){
     return new Promise<any>((resolve, reject) => {
       let currentUser = this.auth.getcurrentUser();
       this.afs.collection('Users').doc(currentUser.uid).set({
         gender: value.gender,
         lineid: value.lineid,
         phonenumber: value.phonenumber,
         username: value.username
       })
       .then(
         res => {
             this.navCtrl.push('StartQuestionnairePage');
             resolve(res);},
         err => reject(err)
       )
     })
   }
  goBackToSignIn() {
      this.navCtrl.push('LoginPage');
  }
}
