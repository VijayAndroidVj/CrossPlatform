import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTaskPage } from './view-task';

@NgModule({
  declarations: [
    ViewTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTaskPage),
  ],
})
export class ViewTaskPageModule {}
