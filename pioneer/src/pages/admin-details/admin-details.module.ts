import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDetailsPage } from './admin-details';

@NgModule({
  declarations: [
    AdminDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDetailsPage),
  ],
})
export class AdminDetailsPageModule {}
