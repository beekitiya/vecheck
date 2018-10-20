webpackJsonp([7],{

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(343);
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

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(223);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { FormBuilder, FormGroup } from '@angular/forms';

var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, user, 
        //public formCtrl: Form,
        toastCtrl, alertCtrl, translateService, viewCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        //loginForm: FormGroup;
        //loading: Loading;
        this.account = { email: '', password: '' };
        this.translateService.get('LOGIN_ERROR').subscribe(function (value) {
            _this.loginErrorString = value;
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
        this.user.login(this.account).subscribe(function (resp) {
            if (resp) {
                _this.navCtrl.push('MainPage');
            }
            else {
                _this.showError("Username or Password incorrect");
            }
        }, function (error) {
            _this.showError(error.message);
        });
    };
    LoginPage.prototype.showError = function (text) {
        //this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Unable',
            subTitle: text,
            buttons: ['OK']
        });
        //alert.present(prompt);
    };
    LoginPage.prototype.gotoMainPage = function () {
        this.navCtrl.push('MainPage');
    };
    // Attempt to login in through our User service
    LoginPage.prototype.gotoSignUp = function () {
        this.navCtrl.push('SignupPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/login/login.html"*/'<ion-content class="app-background" padding>\n    <img class="app-logo" src="../assets/imgs/app-logo.png">\n\n    <div class="login-form">\n        <form (ngSubmit)="login()">\n            <ion-list>\n                <ion-item>\n                    <ion-label><ion-icon name="ios-mail-outline" item-left></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="account.email" type="text" name="email" placeholder="Email"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label><ion-icon name="ios-lock-outline" item-left></ion-icon></ion-label>\n                    <ion-input [(ngModel)]="account.password" type="password" name="password" placeholder="รหัสผ่าน"></ion-input>\n                </ion-item>\n            </ion-list>\n            <ion-row>\n                <ion-col text-center>\n                    <button ion-button block type="submit">\n                        เข้าสู่ระบบ\n                    </button>\n                </ion-col>\n            </ion-row>\n            <ion-row style="margin-top:-20px">\n                <ion-col text-center>\n                    <p style="color:#000000">\n                        ยังไม่มีบัญชีผู้ใช้?\n                        <button ion-button clear class="signup-button" type="button" color="button-color" (click)="gotoSignUp()"><u>ลงทะเบียน!</u></button>\n                    </p>\n                </ion-col>\n            </ion-row>\n        </form>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=7.js.map