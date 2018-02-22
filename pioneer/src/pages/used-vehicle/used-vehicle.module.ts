import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsedVehiclePage } from './used-vehicle';

@NgModule({
  declarations: [
    UsedVehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(UsedVehiclePage),
  ],
})
export class UsedVehiclePageModule {}
