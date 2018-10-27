webpackJsonp([4],{

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Questionnaire3PageModule", function() { return Questionnaire3PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionnaire3__ = __webpack_require__(583);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Questionnaire3PageModule = /** @class */ (function () {
    function Questionnaire3PageModule() {
    }
    Questionnaire3PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__questionnaire3__["a" /* Questionnaire3Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__questionnaire3__["a" /* Questionnaire3Page */]),
            ],
        })
    ], Questionnaire3PageModule);
    return Questionnaire3PageModule;
}());

//# sourceMappingURL=questionnaire3.module.js.map

/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Questionnaire3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(27);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the Questionnaire3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Questionnaire3Page = /** @class */ (function () {
    function Questionnaire3Page(navCtrl, navParams, fb, auth, afs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.afs = afs;
        this.questionnaireForm = fb.group({
            insurance_expire: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
            insurance: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
            third_insurance_expire: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
            car_tax_expire: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required]
        });
    }
    Questionnaire3Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Questionnaire3Page');
    };
    Questionnaire3Page.prototype.writeData = function () {
        var data = Object.assign({}, this.navParams.data, this.questionnaireForm.value);
        this.createcarProfile(data);
    };
    Questionnaire3Page.prototype.gotoMainPage = function () {
        this.navCtrl.push('MainPage');
    };
    Questionnaire3Page.prototype.createcarProfile = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = _this.auth.getcurrentUser();
            _this.afs.collection('Users').doc(currentUser.uid).collection('Cars').add(__assign({}, value))
                .then(function (res) {
                _this.gotoMainPage();
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    Questionnaire3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questionnaire3',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire3/questionnaire3.html"*/'<ion-content padding class="app-background">\n    <form class="car-questionnaire" [formGroup]="questionnaireForm" (ngSubmit)="writeData()">\n        <h3 text-center>ภาษีรถยนต์</h3>\n        <ion-item class="regis-input">\n            <ion-label>วันหมดอายุภาษีประจำปี</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="DD/MM/YYYY" required text-right formControlName="car_tax_expire" max="2025-12-31"></ion-datetime>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>วันสิ้นสุดประกันภัยภาคบังคับ (พรบ.)</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="DD/MM/YYYY" required text-right formControlName="third_insurance_expire" max="2025-12-31"></ion-datetime>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>บริษัทประกันภัยภาคสมัครใจ</ion-label>\n            <ion-select  formControlName="insurance">\n                <ion-option value="กรุงเทพประกันภัย">กรุงเทพประกันภัย</ion-option>\n                <ion-option value="กรุงไทยพานิชประกันภัย">กรุงไทยพานิชประกันภัย</ion-option>\n                <ion-option >คุ้มภัย</ion-option>\n                <ion-option >ชับบ์สามัคคีประกันภัย</ion-option>\n                <ion-option >ทิพยประกันภัย</ion-option>\n                <ion-option >นวกิจประกันภัย</ion-option>\n                <ion-option >วิริยะประกันภัย</ion-option>\n                <ion-option >สินทรัพย์ประกันภัย</ion-option>\n                <ion-option >สินมั่นคง</ion-option>\n                <ion-option >อลิอันซ์</ion-option>\n                <ion-option >อาคเนย์ประกันภัย</ion-option>\n                <ion-option >อินทรประกันภัย</ion-option>\n                <ion-option >เคเอสเค ประกันภัย</ion-option>\n                <ion-option >เจพี ประกันภัย</ion-option>\n                <ion-option >เทเวศประกันภัย</ion-option>\n                <ion-option >เมืองไทยประกันภัย</ion-option>\n                <ion-option >เอเชียประกันภัย</ion-option>\n                <ion-option >เอ็มเอสไอจี</ion-option>\n                <ion-option >แปซิฟิก ครอส</ion-option>\n                <ion-option >แอกซ่าประกันภัย</ion-option>\n                <ion-option >แอลเอ็มจี ประกันภัย</ion-option>\n                <ion-option >แโตเกียวมารีน</ion-option>\n                <ion-option >ไทยวิวัฒน์</ion-option>\n                <ion-option >ไทยศรี</ion-option>\n                <ion-option >ไทยเศรษฐ</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>วันสิ้นสุดประกันภัยภาคสมัครใจ</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="DD/MM/YYYY" required text-right formControlName="insurance_expire" max="2025-12-31"></ion-datetime>\n        </ion-item>\n        <img class="car-progress" src="../assets/imgs/car-3.png">\n        <div class="fix-button">\n            <button ion-button block type="submit">\n                สิ้นสุดแบบสอบถาม\n            </button>\n        </div>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire3/questionnaire3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["AngularFirestore"]])
    ], Questionnaire3Page);
    return Questionnaire3Page;
}());

//# sourceMappingURL=questionnaire3.js.map

/***/ })

});
//# sourceMappingURL=4.js.map