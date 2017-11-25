import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AddReportPage } from '../add-report/add-report';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = HomePage;
  @ViewChild(Nav) nav: Nav;
  
   pages: PageInterface[] = [
     { title: 'DASHBOARD', pageName: 'testOne', tabComponent: 'testOne', index: 0, icon: 'home' },
     { title: 'ADD REPORT', pageName: 'AddReportPage', tabComponent: 'AddReportPage', index: 1, icon: 'md-people' },
     { title: 'CUSTOMER MANAGEMENT', pageName: 'CustomerPage',tabComponent:'CustomerPage', icon: 'contacts' },
     { title: 'SETTING', pageName: 'CustomerPage',tabComponent:'CustomerPage',index: 1, icon: 'settings' },
     { title: 'LOGOUT', pageName: 'test',tabComponent:'test', icon: 'md-log-out' }
   ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page: PageInterface) {
    let params = {};

    if(page.pageName == "test"){
      this.navCtrl.setRoot(LoginPage);
    }else if(page.pageName == "testOne"){
      this.nav.setRoot(HomePage);
    }else{
      this.nav.setRoot(page.pageName);
      if (page.index) {
        params = { tabIndex: page.index };
      }
   
      // The active child nav is our Tabs Navigation
      if (this.nav.getActiveChildNav() && page.index != undefined) {
        this.nav.getActiveChildNav().select(page.index);
      } else {
        // Tabs are not active, so reset the root page 
        // In this case: moving to or from SpecialPage
        this.nav.setRoot(page.pageName, params);
      }
    }
   // this.navCtrl.setRoot(page.pageName);
   
 
    // The index is equal to the order of our tabs inside tabs.ts
    

    
    


  }

 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    if(page.pageName == "test"){
     // this.navCtrl.setRoot(LoginPage);
    }else if(page.pageName == "testOne"){
      //this.navCtrl.setRoot(HomePage);
    }else{
      let childNav = this.nav.getActiveChildNav();
      
         if (childNav) {
           if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
             return 'primary';
           }
           return;
         }
      
         // Fallback needed when there is no active childnav (tabs not active)
         if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
           return 'primary';
         }
         return;
    }
 
  }

}



 

