webpackJsonp([3],{

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup__ = __webpack_require__(581);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__signup__["a" /* SignupPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__signup__["a" /* SignupPage */]
            ]
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    //login: LoginPage;
    //main: MainPage;
    //startQuestionnaire: StartQuestionnairePage;
    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    /*account: { name: string, email: string, password: string } = {
      name: 'Test Human',
      email: 'test@example.com',
      password: 'test'
  };*/
    // Our translated text strings
    //private signupErrorString: string;
    function SignupPage(navCtrl, user, toastCtrl, translateService, aleCtrl, navParams, fb, auth, afs) {
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.aleCtrl = aleCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.afs = afs;
        this.signupForm = fb.group({
            username: [''],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required],
            lineid: [''],
            phonenumber: [''],
            gender: ['']
        });
    }
    SignupPage.prototype.signup = function () {
        var _this = this;
        // Attempt to login in through our User service
        var data = this.signupForm.value;
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signUp(credentials).then(function () {
            _this.createProfile(data);
        }, function (error) { return _this.signupError = error.message; });
    };
    SignupPage.prototype.createProfile = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = _this.auth.getcurrentUser();
            _this.afs.collection('Users').doc(currentUser.uid).set({
                gender: value.gender,
                lineid: value.lineid,
                phonenumber: value.phonenumber,
                username: value.username
            })
                .then(function (res) {
                _this.navCtrl.push('StartQuestionnairePage');
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    SignupPage.prototype.goBackToSignIn = function () {
        this.navCtrl.push('LoginPage');
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/signup/signup.html"*/'<ion-content class="app-background" padding>\n    <img class="app-logo" src="../assets/imgs/app-logo.png">\n\n    <div class="signup-form">\n        <form (ngSubmit)="signup()" [formGroup]="signupForm">\n            <ion-item class="regis-input">\n                <ion-label>Username</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="text" formControlName="username" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>Email</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="email" formControlName="email" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>รหัสผ่าน</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="password" formControlName="password" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>เบอร์โทรศัพท์</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="tel" formControlName="phonenumber" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>Line ID</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="text" formControlName="lineid" text-right></ion-input>\n            </ion-item>\n            <ion-row radio-group formControlName="gender">\n                <ion-col col-4>\n                    <ion-item class="group-radio">\n                        เพศ\n                    </ion-item>\n                </ion-col>\n                <ion-col col-4>\n                    <ion-item class="group-radio">\n                        <ion-radio value="male"  item-left></ion-radio>\n                        <ion-label>ชาย</ion-label>\n                    </ion-item>\n                </ion-col>\n                <ion-col col-4>\n                    <ion-item class="group-radio">\n                        <ion-radio value="female" item-left></ion-radio>\n                        <ion-label>หญิง</ion-label>\n                    </ion-item>\n                </ion-col>\n            </ion-row>\n            <button ion-button block type="submit">\n                ลงทะเบียน\n            </button>\n            <ion-row style="margin-top:0.5em">\n                <ion-col text-center>\n                    <p style="color:#000000">\n                        มีบัญชีผู้ใช้เรียบร้อยแล้ว?\n                        <button ion-button clear class="signin-button" type="button" color="button-color" (click)="goBackToSignIn()"><u>เข้าสู่ระบบ!</u></button>\n                    </p>\n                </ion-col>\n            </ion-row>\n        </form>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers__["c" /* User */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__["AngularFirestore"]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=3.js.map