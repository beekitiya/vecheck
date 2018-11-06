import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import { Config, Nav, Platform } from "ionic-angular";

import { FirstRunPage } from "../pages";
import { Settings } from "../providers";

import { AuthService } from "../services/auth.service";

@Component({
  template: `<ion-menu [content]="content">
    <ion-header style=" height: 200px;">
      <ion-toolbar color="font-color" style=" height: 200px;">
        <img class="menu-logo" src="../assets/imgs/menu-logo.png">
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item no-lines class="bottom-border" *ngFor="let p of pages" (click)="openPage(p)">
          <ion-icon item-start [name]="p.icon"></ion-icon>{{p.title}}
        </button>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-nav #content [root]="rootPage" swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav)
  nav: Nav;

  pages: any[] = [
    { title: "หน้าหลัก", component: "MainPage", icon: "home" },
    { title: "แก้ไขข้อมูลรถยนต์", component: "Questionnaire1Page", icon: "car"},
    { title: "แผนที่อู่ซ่อมรถ", component: "GarageMapPage", icon: "map" },
    { title: "คูปองส่วนลด", component: "CouponPage", icon: "cash" },
    { title: "ออกจากระบบ", icon: "log-out" }
  ];

  constructor(
    private translate: TranslateService,
    platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: AuthService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#000000');
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang("en");
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === "zh") {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use("zh-cmn-Hans");
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use("zh-cmn-Hant");
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use("en"); // Set your language here
    }

    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe(values => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      this.nav.setRoot(page.component);
    } else {
      this.auth
        .logOut()
        .then((data: any) => {
          this.nav.setRoot("LoginPage");
        })
        .catch((error: any) => {
          console.dir(error);
        });
      //this.nav.setRoot('LoginPage');
    }
  }
}
