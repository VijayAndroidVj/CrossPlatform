import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchDetailsPage } from './branch-details';

@NgModule({
  declarations: [
    BranchDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchDetailsPage),
  ],
})
export class BranchDetailsPageModule {}
