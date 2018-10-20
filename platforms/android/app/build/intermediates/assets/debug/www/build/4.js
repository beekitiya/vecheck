webpackJsonp([4],{

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Questionnaire2PageModule", function() { return Questionnaire2PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionnaire2__ = __webpack_require__(358);
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

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Questionnaire2Page; });
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
 * Generated class for the Questionnaire2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Questionnaire2Page = /** @class */ (function () {
    function Questionnaire2Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Questionnaire2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Questionnaire2Page');
    };
    Questionnaire2Page.prototype.goToQuestionnaire3 = function () {
        this.navCtrl.push('Questionnaire3Page');
    };
    Questionnaire2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questionnaire2',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire2/questionnaire2.html"*/'<ion-content padding class="app-background">\n    <form class="car-questionnaire">\n        <h3 text-center>การบำรุงรักษารถยนต์</h3>\n        <ion-item class="regis-input">\n            <ion-label>เลขไมล์</ion-label>\n            <ion-input style="margin-bottom: -15px;" type="text" required text-right></ion-input>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>วันที่เข้าศูนย์บริการล่าสุด</ion-label>\n            <ion-datetime style="margin-bottom: -20px;" displayFormat="MM/DD/YYYY" required text-right></ion-datetime>\n        </ion-item>\n        <ion-grid radio-group>\n            <ion-row>\n                <ion-item class="group-radio">\n                    ประเภทศูนย์บริการ\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="1" item-left></ion-radio>\n                    <ion-label>ศูนย์บริการรถยนต์ (เช่น โตโยต้า)</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="2" item-left></ion-radio>\n                    <ion-label>อู่ซ่อมรถ</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="0" item-left></ion-radio>\n                    <ion-label>ศูนย์บริการเฉพาะทาง (เช่น B-Quik)</ion-label>\n                </ion-item>\n            </ion-row>\n        </ion-grid>\n        <ion-grid radio-group>\n            <ion-row>\n                <ion-item class="group-radio">\n                    ประเภทน้ำมันเครื่องที่ใช้\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="1" item-left></ion-radio>\n                    <ion-label>5,000</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="2" item-left></ion-radio>\n                    <ion-label>10,000</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item class="group-radio" style="padding-left:20px;">\n                    <ion-radio value="0" item-left></ion-radio>\n                    <ion-label>ไม่แน่ใจ</ion-label>\n                </ion-item>\n            </ion-row>\n        </ion-grid>\n        <div class="fix-button">\n            <button ion-button full type="submit" (click)="goToQuestionnaire3()">\n                ถัดไป\n            </button>\n        </div>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire2/questionnaire2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], Questionnaire2Page);
    return Questionnaire2Page;
}());

//# sourceMappingURL=questionnaire2.js.map

/***/ })

});
//# sourceMappingURL=4.js.map