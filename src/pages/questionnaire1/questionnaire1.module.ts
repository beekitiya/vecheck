import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Questionnaire1Page } from './questionnaire1';
import { KeysPipe } from './keys';

@NgModule({
  declarations: [
    Questionnaire1Page,
    KeysPipe
  ],
  imports: [
    IonicPageModule.forChild(Questionnaire1Page),
  ],
})
export class Questionnaire1PageModule {}
