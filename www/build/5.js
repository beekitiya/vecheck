webpackJsonp([5],{

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Questionnaire1PageModule", function() { return Questionnaire1PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionnaire1__ = __webpack_require__(586);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Questionnaire1PageModule = /** @class */ (function () {
    function Questionnaire1PageModule() {
    }
    Questionnaire1PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__questionnaire1__["a" /* Questionnaire1Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__questionnaire1__["a" /* Questionnaire1Page */]),
            ],
        })
    ], Questionnaire1PageModule);
    return Questionnaire1PageModule;
}());

//# sourceMappingURL=questionnaire1.module.js.map

/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Questionnaire1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
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
 * Generated class for the Questionnaire1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Questionnaire1Page = /** @class */ (function () {
    function Questionnaire1Page(navCtrl, navParams, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questionnaireForm = fb.group({
            brand: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            model: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            model_year: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            model_color: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            model_engine: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            model_gear: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            model_country: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            model_license: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
    }
    Questionnaire1Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Questionnaire1Page');
    };
    Questionnaire1Page.prototype.goToQuestionnaire2 = function () {
        var data = this.questionnaireForm.value;
        this.navCtrl.push('Questionnaire2Page', data);
    };
    Questionnaire1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questionnaire1',template:/*ion-inline-start:"/Users/prince/vecheck/src/pages/questionnaire1/questionnaire1.html"*/'<ion-content padding class="app-background">\n    <form class="car-questionnaire" [formGroup]="questionnaireForm">\n        <h3 text-center>รถยนต์</h3>\n        <ion-item class="regis-input">\n            <ion-label>ยี่ห้อ</ion-label>\n            <ion-select formControlName="brand" >\n                <ion-option value="Honda">Honda</ion-option>\n                <ion-option >Toyota</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>รุ่น</ion-label>\n            <ion-select formControlName="model">\n                <ion-option value="Brio">Honda Brio</ion-option>\n                <ion-option >Honda City</ion-option>\n                <ion-option >Honda HR-V</ion-option>\n                <ion-option >Honda Jazz</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>ปี</ion-label>\n            <ion-select formControlName="model_year">\n                <ion-option value="2005">2005</ion-option>\n                <ion-option >2006</ion-option>\n                <ion-option >2007</ion-option>\n                <ion-option >2008</ion-option>\n                <ion-option >2009</ion-option>\n                <ion-option >2010</ion-option>\n                <ion-option >2011</ion-option>\n                <ion-option >2012</ion-option>\n                <ion-option >2013</ion-option>\n                <ion-option >2014</ion-option>\n                <ion-option >2015</ion-option>\n                <ion-option >2016</ion-option>\n                <ion-option >2017</ion-option>\n                <ion-option >2018</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>สีรถยนต์</ion-label>\n            <ion-select formControlName="model_color">\n                <ion-option value="ดำ">ดำ</ion-option>\n                <ion-option >ขาว</ion-option>\n                <ion-option >เทา</ion-option>\n                <ion-option >น้ำเงิน</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-row radio-group formControlName="model_gear">\n            <ion-col col-3>\n                <ion-item class="group-radio">\n                    เกียร์\n                </ion-item>\n            </ion-col>\n            <ion-col col-5>\n                <ion-item class="group-radio">\n                    <ion-radio value="1" item-left></ion-radio>\n                    <ion-label>ธรรมดา</ion-label>\n                </ion-item>\n            </ion-col>\n            <ion-col col-4>\n                <ion-item class="group-radio">\n                    <ion-radio value="2" item-left></ion-radio>\n                    <ion-label>ออโต้</ion-label>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n        <ion-item class="regis-input">\n            <ion-label>ขนาดเครื่องยนต์ (CC.)</ion-label>\n            <ion-select formControlName="model_engine">\n                <ion-option value="1500">1,500 CC</ion-option>\n                <ion-option >1,800 CC</ion-option>\n                <ion-option >2,000 CC</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>ประเทศที่จดทะเบียน</ion-label>\n            <ion-select formControlName="model_country">\n                <ion-option value="England">England</ion-option>\n                <ion-option >Japan</ion-option>\n                <ion-option >Thailand</ion-option>\n                <ion-option >USA</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>ทะเบียนรถยนต์</ion-label>\n            <ion-input style="margin-bottom: -15px;" type="text" required text-right formControlName="model_license"></ion-input>\n        </ion-item>\n        <div class="fix-button">\n            <button ion-button full type="submit" (click)="goToQuestionnaire2()">\n                ถัดไป\n            </button>\n        </div>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/prince/vecheck/src/pages/questionnaire1/questionnaire1.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], Questionnaire1Page);
    return Questionnaire1Page;
}());

//# sourceMappingURL=questionnaire1.js.map

/***/ })

});
//# sourceMappingURL=5.js.map