import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuonePage } from './menuone';

@NgModule({
  declarations: [
    MenuonePage,
  ],
  imports: [
    IonicPageModule.forChild(MenuonePage),
  ],
})
export class MenuonePageModule {}
