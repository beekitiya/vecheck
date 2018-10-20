import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartQuestionnairePage } from './start-questionnaire';

@NgModule({
  declarations: [
    StartQuestionnairePage,
  ],
  imports: [
    IonicPageModule.forChild(StartQuestionnairePage),
  ],
})
export class StartQuestionnairePageModule {}
