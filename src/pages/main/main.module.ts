import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { ProgressBarModule } from "angular-progress-bar"
//import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    ProgressBarModule
  ],
})
export class MainPageModule {}
