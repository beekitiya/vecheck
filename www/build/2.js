webpackJsonp([2],{

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup__ = __webpack_require__(589);
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

/***/ 589:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(166);
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
            selector: 'page-signup',template:/*ion-inline-start:"/Users/prince/vecheck/src/pages/signup/signup.html"*/'<!--<ion-content class="app-background" padding>\n    <img class="app-logo" src="../assets/imgs/logo.png">\n\n    <div class="signup-form">\n        <form (submit)="doSignup()">\n            <ion-slides pager>\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Personal</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Full name</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="text" name="fullname" [(ngModel)]="account.fullname" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Email</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="email" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Password</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="password" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Tel.</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="tel" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Line ID</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-row radio-group>\n                            <ion-col col-4>\n                                <ion-item class="group-radio">\n                                    Gender\n                                </ion-item>\n                            </ion-col>\n                            <ion-col col-4>\n                                <ion-item class="group-radio">\n                                    <ion-radio value="male"></ion-radio>\n                                    <ion-label>Male</ion-label>\n                                </ion-item>\n                            </ion-col>\n                            <ion-col col-4>\n                                <ion-item class="group-radio">\n                                    <ion-radio value="female"></ion-radio>\n                                    <ion-label>Female</ion-label>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                    </fieldset>\n                </ion-slide>\n\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Car</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Brand</ion-label>\n                            <ion-select>\n                                <ion-option >Honda</ion-option>\n                                <ion-option >Toyota</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Version</ion-label>\n                            <ion-select>\n                                <ion-option >Honda Brio</ion-option>\n                                <ion-option >Honda City</ion-option>\n                                <ion-option >Honda HR-V</ion-option>\n                                <ion-option >Honda Jazz</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Year</ion-label>\n                            <ion-select>\n                                <ion-option >2005</ion-option>\n                                <ion-option >2006</ion-option>\n                                <ion-option >2007</ion-option>\n                                <ion-option >2008</ion-option>\n                                <ion-option >2009</ion-option>\n                                <ion-option >2010</ion-option>\n                                <ion-option >2011</ion-option>\n                                <ion-option >2012</ion-option>\n                                <ion-option >2013</ion-option>\n                                <ion-option >2014</ion-option>\n                                <ion-option >2015</ion-option>\n                                <ion-option >2016</ion-option>\n                                <ion-option >2017</ion-option>\n                                <ion-option >2018</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Color</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Gear type</ion-label>\n                            <ion-select>\n                                <ion-option >Auto</ion-option>\n                                <ion-option >Mannual</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Engine (CC.)</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Country</ion-label>\n                            <ion-select>\n                                <ion-option >England</ion-option>\n                                <ion-option >Japan</ion-option>\n                                <ion-option >Thailand</ion-option>\n                                <ion-option >USA</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>License plate</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                    </fieldset>\n                </ion-slide>\n\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Car maintenance</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Mileage</ion-label>\n                            <ion-input style="margin-bottom: -20px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Latest date of garage usage</ion-label>\n                            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Service Center Type</ion-label>\n                            <ion-select>\n                                <ion-option>Customer Service (i.e Toyota, Honda)</ion-option>\n                                <ion-option>Garage</ion-option>\n                                <ion-option>Specialised customer service (i.e B-Quik, AutoBoy, Cockpit)</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-grid radio-group>\n                            <ion-row>\n                                <ion-col col-12>\n                                    <ion-item class="group-radio">\n                                        Service Center Type\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                            <ion-row style="margin-top: -1.5em">\n                                <ion-col col-12>\n                                    <ion-item class="group-radio">\n                                        <ion-radio value="2"></ion-radio>\n                                        <ion-label>Customer Service (i.e Toyota, Honda)</ion-label>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                            <ion-row style="margin-top: -1.5em">\n                                <ion-col col-12>\n                                    <ion-item class="group-radio">\n                                        <ion-radio value="2"></ion-radio>\n                                        <ion-label>Garage</ion-label>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                            <ion-row style="margin-top: -1.5em">\n                                <ion-col col-12>\n                                    <ion-item class="group-radio">\n                                        <ion-radio value="2"></ion-radio>\n                                        <ion-label>Specialised customer service (i.e B-Quik)</ion-label>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                        <ion-grid radio-group style="margin-top: -20px">\n                            <ion-row>\n                                <ion-col col-6>\n                                    <ion-item class="group-radio">\n                                        Motor oil type\n                                    </ion-item>\n                                </ion-col>\n                                <ion-col col-6>\n                                    <ion-item class="group-radio">\n                                        <ion-radio value="1"></ion-radio>\n                                        <ion-label>5,000</ion-label>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                            <ion-row style="margin-top: -1.5em">\n                                <ion-col col-6>\n                                </ion-col>\n                                <ion-col col-6>\n                                    <ion-item class="group-radio">\n                                        <ion-radio value="2"></ion-radio>\n                                        <ion-label>10,000</ion-label>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                            <ion-row style="margin-top: -1.5em">\n                                <ion-col col-6>\n                                </ion-col>\n                                <ion-col col-6>\n                                    <ion-item class="group-radio">\n                                        <ion-radio value="0"></ion-radio>\n                                        <ion-label>Not Sure</ion-label>\n                                    </ion-item>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </fieldset>\n                </ion-slide>\n\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Annual vehicle tax</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Annual tax expire date</ion-label>\n                            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Compulsory insurance expire date</ion-label>\n                            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Voluntary motor insurance company</ion-label>\n                            <ion-select>\n                                <ion-option >กรุงเทพประกันภัย</ion-option>\n                                <ion-option >ไทยไพบูลย์</ion-option>\n                                <ion-option >สินมั่นคง</ion-option>\n                                <ion-option >กรุงไทยพานิชประกันภัย</ion-option>\n                                <ion-option >ไทยวิวัฒน์</ion-option>\n                                <ion-option >อลิอันซ์</ion-option>\n                                <ion-option >คุ้มภัย</ion-option>\n                                <ion-option >ไทยศรี</ion-option>\n                                <ion-option >อาคเนย์ประกันภัย</ion-option>\n                                <ion-option >เคเอสเค ประกันภัย</ion-option>\n                                <ion-option >ไทยเศรษฐ</ion-option>\n                                <ion-option >อินทรประกันภัย</ion-option>\n                                <ion-option >เจพี ประกันภัย</ion-option>\n                                <ion-option >นวกิจประกันภัย</ion-option>\n                                <ion-option >เอเชียประกันภัย</ion-option>\n                                <ion-option >ชับบ์สามัคคีประกันภัย</ion-option>\n                                <ion-option >แปซิฟิก ครอส</ion-option>\n                                <ion-option >เอ็มเอสไอจี</ion-option>\n                                <ion-option >โตเกียวมารีน</ion-option>\n                                <ion-option >เมืองไทยประกันภัย</ion-option>\n                                <ion-option >แอกซ่าประกันภัย</ion-option>\n                                <ion-option >แอกซ่าประกันภัย</ion-option>\n                                <ion-option >ทิพยประกันภัย</ion-option>\n                                <ion-option >วิริยะประกันภัย</ion-option>\n                                <ion-option >แอลเอ็มจี ประกันภัย</ion-option>\n                                <ion-option >เทเวศประกันภัย</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Voluntary motor insurance expire date</ion-label>\n                            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n                        </ion-item>\n                    </fieldset>\n                </ion-slide>\n            </ion-slides>\n            <button ion-button block type="submit">\n                SIGN UP\n            </button>\n            <ion-row style="margin-top:-15px">\n                <ion-col text-center>\n                    <p style="color:#ffffff">\n                        Have an account already?\n                        <button ion-button clear class="signin-button" type="button" color="button-color" (click)="goBackToSignIn()"><u>SIGN IN!</u></button>\n                    </p>\n                </ion-col>\n            </ion-row>\n        </form>\n    </div>\n</ion-content>-->\n\n\n<ion-content class="app-background" padding>\n    <img class="app-logo" src="../assets/imgs/app-logo.png">\n\n    <div class="signup-form">\n        <form (ngSubmit)="signup()" [formGroup]="signupForm">\n            <ion-item class="regis-input">\n                <ion-label>Username</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="text" formControlName="username" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>Email</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="email" formControlName="email" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>รหัสผ่าน</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="password" formControlName="password" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>เบอร์โทรศัพท์</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="tel" formControlName="phonenumber" text-right></ion-input>\n            </ion-item>\n            <ion-item class="regis-input">\n                <ion-label>Line ID</ion-label>\n                <ion-input style="margin-bottom: -20px;" type="text" formControlName="lineid" text-right></ion-input>\n            </ion-item>\n            <ion-row radio-group formControlName="gender">\n                <ion-col col-4>\n                    <ion-item class="group-radio">\n                        เพศ\n                    </ion-item>\n                </ion-col>\n                <ion-col col-4>\n                    <ion-item class="group-radio">\n                        <ion-radio value="male"  item-left></ion-radio>\n                        <ion-label>ชาย</ion-label>\n                    </ion-item>\n                </ion-col>\n                <ion-col col-4>\n                    <ion-item class="group-radio">\n                        <ion-radio value="female" item-left></ion-radio>\n                        <ion-label>หญิง</ion-label>\n                    </ion-item>\n                </ion-col>\n            </ion-row>\n            <button ion-button block type="submit">\n                ลงทะเบียน\n            </button>\n            <ion-row style="margin-top:0.5em">\n                <ion-col text-center>\n                    <p style="color:#000000">\n                        มีบัญชีผู้ใช้เรียบร้อยแล้ว?\n                        <button ion-button clear class="signin-button" type="button" color="button-color" (click)="goBackToSignIn()"><u>เข้าสู่ระบบ!</u></button>\n                    </p>\n                </ion-col>\n            </ion-row>\n        </form>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/prince/vecheck/src/pages/signup/signup.html"*/
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
//# sourceMappingURL=2.js.map