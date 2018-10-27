webpackJsonp([1],{

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Questionnaire1PageModule", function() { return Questionnaire1PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questionnaire1__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keys__ = __webpack_require__(581);
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
                __WEBPACK_IMPORTED_MODULE_3__keys__["a" /* KeysPipe */]
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

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Questionnaire1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/**
 * Generated class for the Questionnaire1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Questionnaire1Page = /** @class */ (function () {
    function Questionnaire1Page(navCtrl, navParams, fb, afs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.questionnaireForm = fb.group({
            car_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ionViewDidLoad Questionnaire1Page');
                        return [4 /*yield*/, this.readBrands().then(function (out) {
                                _this.cars = out;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Questionnaire1Page.prototype.getModel = function (brand) {
        this.models = this.cars[brand].map(function (x) { return x.model; });
        this.brand = brand;
    };
    Questionnaire1Page.prototype.getYear = function (model) {
        this.model = model;
        this.years = this.cars[this.brand].filter(function (x) { return x.model == model; })[0].engine;
    };
    Questionnaire1Page.prototype.getEngine = function (year) {
        var _this = this;
        this.year = year;
        var result = this.cars[this.brand].filter(function (x) { return x.model == _this.model; })[0].engine[year];
        typeof result === 'object' ? this.engines = result : this.engines = [result];
    };
    Questionnaire1Page.prototype.readBrands = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var brandCollect = _this.afs.collection('CarBrands');
            var getDoc = brandCollect.ref.get()
                .then(function (docs) {
                var obj = {};
                docs.forEach(function (doc) {
                    obj[doc.id] = [];
                    doc.data().Models.forEach(function (model) {
                        _this.readModels(doc.id, model).then(function (out) {
                            obj[doc.id].push({ model: model, engine: out });
                        });
                    });
                });
                resolve(obj);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    Questionnaire1Page.prototype.readModels = function (brand, model) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var brandCollect = _this.afs.collection('CarBrands');
            brandCollect.doc(brand).collection(model).ref.get().then(function (m_docs) {
                var obj = {};
                m_docs.forEach(function (doc) {
                    obj = doc.data();
                });
                resolve(obj);
            }).catch(function (err) {
                reject(err);
            });
            ;
        });
    };
    Questionnaire1Page.prototype.goToQuestionnaire2 = function () {
        var data = this.questionnaireForm.value;
        this.navCtrl.push('Questionnaire2Page', data);
    };
    Questionnaire1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questionnaire1',template:/*ion-inline-start:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire1/questionnaire1.html"*/'<ion-content padding class="app-background">\n    <!--<div class="orderStatus" style="margin-top:2em;">\n        <ul class="row">\n            <li class="col done">Step 1</li>\n            <li class="col done">Step 2</li>\n            <li class="col">Step 3</li>\n        </ul>\n    </div>-->\n    <form class="car-questionnaire" [formGroup]="questionnaireForm">\n        <h3 text-center>รถยนต์</h3>\n        <ion-item class="regis-input">\n            <ion-label>ชื่อรถยนต์</ion-label>\n            <ion-input type="text" style="margin-bottom: -20px;" required text-right formControlName="car_name"></ion-input>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>ยี่ห้อ</ion-label>\n            <ion-select (ionChange)=\'getModel($event)\' formControlName="brand" >\n                <ion-option *ngFor="let item of cars | keys" value={{item.key}} on>{{item.key}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>รุ่น</ion-label>\n            <ion-select (ionChange)=\'getYear($event)\' formControlName="model">\n                <ion-option *ngFor="let item of models" value={{item}}>{{item}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>ปี</ion-label>\n            <ion-select (ionChange)=\'getEngine($event)\'  formControlName="model_year">\n                <ion-option *ngFor="let item of years | keys" value={{item.key}}>{{item.key}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>สีรถยนต์</ion-label>\n            <ion-select formControlName="model_color">\n                <ion-option value="ขาว">ขาว</ion-option>\n                <ion-option value="ดำ">ดำ</ion-option>\n                <ion-option value="ทอง">ทอง</ion-option>\n                <ion-option value="น้ำตาล">น้ำตาล</ion-option>\n                <ion-option value="น้ำเงิน">น้ำเงิน</ion-option>\n                <ion-option value="ฟ้า">ฟ้า</ion-option>\n                <ion-option value="ม่วง">ม่วง</ion-option>\n                <ion-option value="ส้ม">ส้ม</ion-option>\n                <ion-option value="เขียว">เขียว</ion-option>\n                <ion-option value="เงิน">เงิน</ion-option>\n                <ion-option value="เทา">เทา</ion-option>\n                <ion-option value="เหลือง">เหลือง</ion-option>\n                <ion-option value="แดง">แดง</ion-option>\n                <ion-option value="ครีม">ครีม</ion-option>\n                <ion-option value="ชมพู">ชมพู</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-row radio-group formControlName="model_gear">\n            <ion-col col-3>\n                <ion-item class="group-radio">\n                    เกียร์\n                </ion-item>\n            </ion-col>\n            <ion-col col-5>\n                <ion-item class="group-radio">\n                    <ion-radio value="1" item-left></ion-radio>\n                    <ion-label>ธรรมดา</ion-label>\n                </ion-item>\n            </ion-col>\n            <ion-col col-4>\n                <ion-item class="group-radio">\n                    <ion-radio value="2" item-left></ion-radio>\n                    <ion-label>ออโต้</ion-label>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n        <ion-item class="regis-input">\n            <ion-label>ขนาดเครื่องยนต์ (CC.)</ion-label>\n            <ion-select formControlName="model_engine">\n                <ion-option *ngFor="let item of engines" value={{item}}>{{item.toFixed(1)}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>ประเทศที่จดทะเบียน</ion-label>\n            <ion-select formControlName="model_country">\n                <ion-option value="England">อังกฤษ</ion-option>\n                <ion-option >ญี่ปุ่น</ion-option>\n                <ion-option >ไทย</ion-option>\n                <ion-option >สหรัฐอเมริกา</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item class="regis-input">\n            <ion-label>ทะเบียนรถยนต์</ion-label>\n            <ion-input style="margin-bottom: -15px;" type="text" required text-right formControlName="model_license"></ion-input>\n        </ion-item>\n        <img class="car-progress" src="../assets/imgs/car-1.png">\n        <div class="fix-button">\n            <button ion-button full type="submit" (click)="goToQuestionnaire2()">\n                ถัดไป\n            </button>\n        </div>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/kitiyasuriyachay/Desktop/vcare-project/src/pages/questionnaire1/questionnaire1.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["AngularFirestore"]])
    ], Questionnaire1Page);
    return Questionnaire1Page;
}());

//# sourceMappingURL=questionnaire1.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    KeysPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'keys' })
    ], KeysPipe);
    return KeysPipe;
}());

//# sourceMappingURL=keys.js.map

/***/ })

});
//# sourceMappingURL=1.js.map