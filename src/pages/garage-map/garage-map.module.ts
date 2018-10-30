import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GarageMapPage } from './garage-map';

@NgModule({
  declarations: [
    GarageMapPage,
  ],
  imports: [
    IonicPageModule.forChild(GarageMapPage),
  ],
})
export class GarageMapPageModule {}
