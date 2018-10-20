webpackJsonp([3],{

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Questionnaire3PageModule", function() { return Questionnaire3PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionnaire3__ = __webpack_require__(359);
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

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Questionnaire3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(117);
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
    function Questionnaire3Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Questionnaire3Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Questionnaire3Page');
    };
    Questionnaire3Page.prototype.gotoMainPage = function () {
        this.navCtrl.push('MainPage');
    };
    Questionnaire3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questionnaire3',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire3/questionnaire3.html"*/'<ion-content padding class="app-background">\n    <form class="car-questionnaire">\n        <h3 text-center>ภาษีรถยนต์</h3>\n        <ion-item class="regis-input">\n            <ion-label>วันหมดอายุภาษีประจำปี</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>วันสิ้นสุดประกันภัยภาคบังคับ (พรบ.)</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>บริษัทประกันภัยภาคสมัครใจ</ion-label>\n            <ion-select>\n                <ion-option >กรุงเทพประกันภัย</ion-option>\n                <ion-option >ไทยไพบูลย์</ion-option>\n                <ion-option >สินมั่นคง</ion-option>\n                <ion-option >กรุงไทยพานิชประกันภัย</ion-option>\n                <ion-option >ไทยวิวัฒน์</ion-option>\n                <ion-option >อลิอันซ์</ion-option>\n                <ion-option >คุ้มภัย</ion-option>\n                <ion-option >ไทยศรี</ion-option>\n                <ion-option >อาคเนย์ประกันภัย</ion-option>\n                <ion-option >เคเอสเค ประกันภัย</ion-option>\n                <ion-option >ไทยเศรษฐ</ion-option>\n                <ion-option >อินทรประกันภัย</ion-option>\n                <ion-option >เจพี ประกันภัย</ion-option>\n                <ion-option >นวกิจประกันภัย</ion-option>\n                <ion-option >เอเชียประกันภัย</ion-option>\n                <ion-option >ชับบ์สามัคคีประกันภัย</ion-option>\n                <ion-option >แปซิฟิก ครอส</ion-option>\n                <ion-option >เอ็มเอสไอจี</ion-option>\n                <ion-option >โตเกียวมารีน</ion-option>\n                <ion-option >เมืองไทยประกันภัย</ion-option>\n                <ion-option >แอกซ่าประกันภัย</ion-option>\n                <ion-option >แอกซ่าประกันภัย</ion-option>\n                <ion-option >ทิพยประกันภัย</ion-option>\n                <ion-option >วิริยะประกันภัย</ion-option>\n                <ion-option >แอลเอ็มจี ประกันภัย</ion-option>\n                <ion-option >เทเวศประกันภัย</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>วันสิ้นสุดประกันภัยภาคสมัครใจ</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n        </ion-item>\n        <div class="fix-button">\n            <button ion-button block type="submit" (click)="gotoMainPage()">\n                สิ้นสุดแบบสอบถาม\n            </button>\n        </div>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire3/questionnaire3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Questionnaire3Page);
    return Questionnaire3Page;
}());

//# sourceMappingURL=questionnaire3.js.map

/***/ })

});
//# sourceMappingURL=3.js.map