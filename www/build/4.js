webpackJsonp([4],{

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Questionnaire2PageModule", function() { return Questionnaire2PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionnaire2__ = __webpack_require__(587);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Questionnaire2PageModule = /** @class */ (function () {
    function Questionnaire2PageModule() {
    }
    Questionnaire2PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__questionnaire2__["a" /* Questionnaire2Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__questionnaire2__["a" /* Questionnaire2Page */]),
            ],
        })
    ], Questionnaire2PageModule);
    return Questionnaire2PageModule;
}());

//# sourceMappingURL=questionnaire2.module.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Questionnaire2Page; });
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
 * Generated class for the Questionnaire2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Questionnaire2Page = /** @class */ (function () {
    function Questionnaire2Page(navCtrl, navParams, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questionnaireForm = fb.group({
            car_mile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            last_visit: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            service_center: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            engine_oil: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
    }
    Questionnaire2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Questionnaire2Page');
    };
    Questionnaire2Page.prototype.goToQuestionnaire3 = function () {
        var data = Object.assign({}, this.navParams.data, this.questionnaireForm.value);
        this.navCtrl.push('Questionnaire3Page', data);
    };
    Questionnaire2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questionnaire2',template:/*ion-inline-start:"/Users/prince/vecheck/src/pages/questionnaire2/questionnaire2.html"*/'<ion-content padding class="app-background">\n    <form class="car-questionnaire" [formGroup]="questionnaireForm">\n        <h3 text-center>ข้อมูลในการบำรุงรักษารถยนต์</h3>\n        <ion-item class="regis-input">\n            <ion-label>เลขไมล์ปัจจุบัน</ion-label>\n            <ion-input style="margin-bottom: -15px;" type="text" required text-right formControlName="car_mile"></ion-input>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>วันที่เข้าศูนย์บริการล่าสุด</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="DD/MM/YYYY" required text-right formControlName="last_visit"></ion-datetime>\n        </ion-item>\n        <ion-grid radio-group formControlName="service_center">\n            <ion-row>\n                <ion-item class="group-radio">\n                    ประเภทศูนย์บริการ\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="1" item-left></ion-radio>\n                    <ion-label>ศูนย์บริการรถยนต์ (เช่น โตโยต้า)</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="2" item-left></ion-radio>\n                    <ion-label>อู่ซ่อมรถ</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="0" item-left></ion-radio>\n                    <ion-label>ศูนย์บริการเฉพาะทาง (เช่น B-Quik)</ion-label>\n                </ion-item>\n            </ion-row>\n        </ion-grid>\n        <ion-grid radio-group formControlName="engine_oil">\n            <ion-row>\n                <ion-item class="group-radio">\n                    ประเภทน้ำมันเครื่องที่ใช้\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="1" item-left></ion-radio>\n                    <ion-label>ทุก 5,000 กิโลเมตร</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="2" item-left></ion-radio>\n                    <ion-label>ทุก 10,000 กิโลเมตร</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="0" item-left></ion-radio>\n                    <ion-label>ไม่แน่ใจ</ion-label>\n                </ion-item>\n            </ion-row>\n        </ion-grid>\n        <div class="fix-button">\n            <button ion-button full type="submit" (click)="goToQuestionnaire3()">\n                ถัดไป\n            </button>\n        </div>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/prince/vecheck/src/pages/questionnaire2/questionnaire2.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object])
    ], Questionnaire2Page);
    return Questionnaire2Page;
    var _a, _b, _c;
}());

//# sourceMappingURL=questionnaire2.js.map

/***/ })

});
//# sourceMappingURL=4.js.map