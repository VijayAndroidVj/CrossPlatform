import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestDrivePage } from './test-drive';

@NgModule({
  declarations: [
    TestDrivePage,
  ],
  imports: [
    IonicPageModule.forChild(TestDrivePage),
  ],
})
export class TestDrivePageModule {}
