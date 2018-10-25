webpackJsonp([7],{

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(567);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
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
    function LoginPage(navCtrl, user, 
        //public formCtrl: Form,
        toastCtrl, alertCtrl, translateService, viewCtrl, auth, fb, afs) {
        /*this.translateService.get('LOGIN_ERROR').subscribe((value) => {
          this.loginErrorString = value;
      });*/
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.viewCtrl = viewCtrl;
        this.auth = auth;
        this.afs = afs;
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
    LoginPage.prototype.login = function () {
        var _this = this;
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
        var data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signInWithEmail(credentials).then(function () { return _this.gotoMainPage(); }, function (error) { return _this.loginError = error.message; });
    };
    /*showError(text) {
        //this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Unable',
            subTitle: text,
            buttons: ['OK']
        });
        //alert.present(prompt);
    }*/
    LoginPage.prototype.gotoMainPage = function () {
        var _this = this;
        var currentUser = this.auth.getcurrentUser();
        this.afs.collection('Users').doc(currentUser.uid).collection('Cars').ref.get()
            .then(function (query) {
            if (query.size > 0) {
                _this.navCtrl.push('MainPage');
            }
            else {
                _this.navCtrl.push('StartQuestionnairePage');
            }
        });
    };
    // Attempt to login in through our User service
    LoginPage.prototype.gotoSignUp = function () {
        this.navCtrl.push('SignupPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/login/login.html"*/'<ion-content class="app-background" padding>\n    <img class="app-logo" src="../assets/imgs/app-logo.png">\n\n    <div class="login-form">\n        <form (ngSubmit)="login()" [formGroup]="loginForm">\n            <ion-list>\n                <ion-item>\n                    <ion-label><ion-icon name="ios-mail-outline" item-left></ion-icon></ion-label>\n                    <ion-input type="text" placeholder="Email" formControlName="email" class="form-control"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label><ion-icon name="ios-lock-outline" item-left></ion-icon></ion-label>\n                    <ion-input type="password" placeholder="รหัสผ่าน" formControlName="password" class="form-control" ></ion-input>\n                </ion-item>\n            </ion-list>\n            <ion-row>\n                <ion-col text-center>\n                    <button ion-button block type="submit">\n                        เข้าสู่ระบบ\n                    </button>\n                </ion-col>\n            </ion-row>\n            <ion-row style="margin-top:-20px">\n                <ion-col text-center>\n                    <p style="color:#000000">\n                        ยังไม่มีบัญชีผู้ใช้?\n                        <button ion-button clear class="signup-button" type="button" color="button-color" (click)="gotoSignUp()"><u>ลงทะเบียน!</u></button>\n                    </p>\n                </ion-col>\n            </ion-row>\n        </form>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__["AngularFirestore"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=7.js.map