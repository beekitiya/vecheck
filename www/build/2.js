webpackJsonp([2],{

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartQuestionnairePageModule", function() { return StartQuestionnairePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__start_questionnaire__ = __webpack_require__(582);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StartQuestionnairePageModule = /** @class */ (function () {
    function StartQuestionnairePageModule() {
    }
    StartQuestionnairePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__start_questionnaire__["a" /* StartQuestionnairePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__start_questionnaire__["a" /* StartQuestionnairePage */]),
            ],
        })
    ], StartQuestionnairePageModule);
    return StartQuestionnairePageModule;
}());

//# sourceMappingURL=start-questionnaire.module.js.map

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartQuestionnairePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
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
 * Generated class for the StartQuestionnairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StartQuestionnairePage = /** @class */ (function () {
    function StartQuestionnairePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    StartQuestionnairePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StartQuestionnairePage');
    };
    StartQuestionnairePage.prototype.goToQuestionnaire1 = function () {
        this.navCtrl.push('Questionnaire1Page');
    };
    StartQuestionnairePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-start-questionnaire',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/start-questionnaire/start-questionnaire.html"*/'<ion-content padding class="app-background">\n    <div class="start-survey">\n        <fieldset>\n            <img class="app-logo" src="../assets/imgs/app-logo.png"><br><br>\n            <h3 text-center>กรุณาตอบแบบสอบถาม</h3><br>\n            <h3 style="margin-top:-20px" text-center>ก่อนเริ่มการใช้งาน</h3>\n            <p text-center>การตอบแบบสอบถามนี้ จะช่วยให้เราสามารถตรวจสอบและดูแลรถยนต์ของคุณได้ดียิ่งขึ้น</p>\n            <button ion-button block type="submit" (click)="goToQuestionnaire1()">\n                เริ่มทำแบบสอบถาม\n            </button>\n        </fieldset>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/start-questionnaire/start-questionnaire.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], StartQuestionnairePage);
    return StartQuestionnairePage;
}());

//# sourceMappingURL=start-questionnaire.js.map

/***/ })

});
//# sourceMappingURL=2.js.map