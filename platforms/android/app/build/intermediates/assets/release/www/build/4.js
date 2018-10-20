webpackJsonp([4],{

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup__ = __webpack_require__(371);
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

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4____ = __webpack_require__(223);
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
    function SignupPage(navCtrl, user, toastCtrl, translateService, aleCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.aleCtrl = aleCtrl;
        this.navParams = navParams;
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.account = {
            name: 'Test Human',
            email: 'test@example.com',
            password: 'test'
        };
        this.translateService.get('SIGNUP_ERROR').subscribe(function (value) {
            _this.signupErrorString = value;
        });
    }
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        // Attempt to login in through our User service
        this.user.signup(this.account).subscribe(function (resp) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["b" /* MainPage */]);
        }, function (err) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["b" /* MainPage */]);
            // Unable to sign up
            var toast = _this.toastCtrl.create({
                message: _this.signupErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    SignupPage.prototype.goBackToSignIn = function () {
        this.navCtrl.push('LoginPage');
    };
    SignupPage.prototype.goToMain = function () {
        this.navCtrl.push('MainPage');
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/signup/signup.html"*/'<ion-content class="app-background" padding>\n    <img class="app-logo" src="../assets/imgs/logo.png">\n\n    <div class="signup-form">\n        <form>\n            <ion-slides pager>\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Personal</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Full name</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Email</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="email" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Password</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="password" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Tel.</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="tel" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Line ID</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Gender</ion-label>\n                            <ion-select>\n                                <ion-option >Male</ion-option>\n                                <ion-option >Female</ion-option>\n                            </ion-select>\n                        </ion-item>\n                    </fieldset>\n                </ion-slide>\n\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Car</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Brand</ion-label>\n                            <ion-select>\n                                <ion-option >Honda</ion-option>\n                                <ion-option >Toyota</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Version</ion-label>\n                            <ion-select>\n                                <ion-option >Honda Brio</ion-option>\n                                <ion-option >Honda City</ion-option>\n                                <ion-option >Honda HR-V</ion-option>\n                                <ion-option >Honda Jazz</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Year</ion-label>\n                            <ion-select>\n                                <ion-option >2005</ion-option>\n                                <ion-option >2006</ion-option>\n                                <ion-option >2007</ion-option>\n                                <ion-option >2008</ion-option>\n                                <ion-option >2009</ion-option>\n                                <ion-option >2010</ion-option>\n                                <ion-option >2011</ion-option>\n                                <ion-option >2012</ion-option>\n                                <ion-option >2013</ion-option>\n                                <ion-option >2014</ion-option>\n                                <ion-option >2015</ion-option>\n                                <ion-option >2016</ion-option>\n                                <ion-option >2017</ion-option>\n                                <ion-option >2018</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Color</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Gear type</ion-label>\n                            <ion-select>\n                                <ion-option >Auto</ion-option>\n                                <ion-option >Mannual</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Engine (CC.)</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Country</ion-label>\n                            <ion-select>\n                                <ion-option >England</ion-option>\n                                <ion-option >Japan</ion-option>\n                                <ion-option >Thailand</ion-option>\n                                <ion-option >USA</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>License plate</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                    </fieldset>\n                </ion-slide>\n\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Car maintaninace</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Mileage</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Latest date of garage usage</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="date" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Service Center Type</ion-label>\n                            <ion-select>\n                                <ion-option>Customer Service (i.e Toyota, Honda)</ion-option>\n                                <ion-option>Garage</ion-option>\n                                <ion-option>Specialised customer service (i.e B-Quik, AutoBoy, Cockpit)</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Motor oil type</ion-label>\n                            <ion-select>\n                                <ion-option>5,000</ion-option>\n                                <ion-option>10,000</ion-option>\n                                <ion-option>Not Sure</ion-option>\n                            </ion-select>\n                        </ion-item>\n                    </fieldset>\n                </ion-slide>\n\n                <ion-slide>\n                    <fieldset>\n                        <legend text-left>Annual vehicle tax</legend>\n                        <ion-item class="regis-input">\n                            <ion-label>Annual tax expire date</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Compulsory motor insurance expire date (พรบ.)</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="date" required text-right></ion-input>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Voluntary motor insurance company</ion-label>\n                            <ion-select>\n                                <ion-option >กรุงเทพประกันภัย</ion-option>\n                                <ion-option >ไทยไพบูลย์</ion-option>\n                                <ion-option >สินมั่นคง</ion-option>\n                                <ion-option >กรุงไทยพานิชประกันภัย</ion-option>\n                                <ion-option >ไทยวิวัฒน์</ion-option>\n                                <ion-option >อลิอันซ์</ion-option>\n                                <ion-option >คุ้มภัย</ion-option>\n                                <ion-option >ไทยศรี</ion-option>\n                                <ion-option >อาคเนย์ประกันภัย</ion-option>\n                                <ion-option >เคเอสเค ประกันภัย</ion-option>\n                                <ion-option >ไทยเศรษฐ</ion-option>\n                                <ion-option >อินทรประกันภัย</ion-option>\n                                <ion-option >เจพี ประกันภัย</ion-option>\n                                <ion-option >นวกิจประกันภัย</ion-option>\n                                <ion-option >เอเชียประกันภัย</ion-option>\n                                <ion-option >ชับบ์สามัคคีประกันภัย</ion-option>\n                                <ion-option >แปซิฟิก ครอส</ion-option>\n                                <ion-option >เอ็มเอสไอจี</ion-option>\n                                <ion-option >โตเกียวมารีน</ion-option>\n                                <ion-option >เมืองไทยประกันภัย</ion-option>\n                                <ion-option >แอกซ่าประกันภัย</ion-option>\n                                <ion-option >แอกซ่าประกันภัย</ion-option>\n                                <ion-option >ทิพยประกันภัย</ion-option>\n                                <ion-option >วิริยะประกันภัย</ion-option>\n                                <ion-option >แอลเอ็มจี ประกันภัย</ion-option>\n                                <ion-option >เทเวศประกันภัย</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <ion-item class="regis-input">\n                            <ion-label>Voluntary motor insurance expire date</ion-label>\n                            <ion-input style="margin-bottom: -15px;" type="date" required text-right></ion-input>\n                        </ion-item>\n                    </fieldset>\n                </ion-slide>\n            </ion-slides>\n            <button ion-button block type="submit" (click)="goToMain()">\n                SIGN UP\n            </button>\n            <ion-row style="margin-top:10px">\n                <ion-col text-center>\n                    <p style="color:#ffffff">\n                        Have an account already?\n                        <button ion-button clear class="signin-button" type="button" color="button-color" (click)="goBackToSignIn()"><u>SIGN IN!</u></button>\n                    </p>\n                </ion-col>\n            </ion-row>\n        </form>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers__["d" /* User */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=4.js.map