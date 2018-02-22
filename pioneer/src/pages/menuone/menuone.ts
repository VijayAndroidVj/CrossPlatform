import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav,ViewController,App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';
import { UserdashboardPage } from '../userdashboard/userdashboard';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the MenuonePage page.
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
  selector: 'page-menuone',
  templateUrl: 'menuone.html',
})
export class MenuonePage {
  rootPageOne = UserdashboardPage;
  @ViewChild(Nav) nav: Nav;
  name;
  designation;

    
 pages: PageInterface[] ;


  constructor(public navCtrl: NavController, public navParams: NavParams,public appCtrl: App,private storage: Storage, public viewCtrl: ViewController,public menuCtrl: MenuController) {
    
    storage.get('designation').then((vals) => {
      this.designation=vals;
      if(vals="Sales Admin"){
        this.pages= [
          { title: 'DASHBOARD', pageName: 'UserdashboardPage', tabComponent: 'UserdashboardPage', index: 0, icon: 'home' },
          { title: 'UPLOAD SALES REPORT', pageName: 'StockReportPage', tabComponent: 'StockReportPage', index: 1, icon: 'md-people' },
          { title: 'UPLOAD STOCK REPORT', pageName: 'AddReportPage', tabComponent: 'AddReportPage', index: 1, icon: 'md-people' },
          { title: 'SALES REPORT', pageName: 'SalesPage', tabComponent: 'SalesPage', index: 1, icon: 'md-paper' },
          { title: 'STOCK REPORT', pageName: 'StockPage', tabComponent: 'StockPage', index: 1, icon: 'md-paper' },
          { title: 'CHAT', pageName: 'ChatPage',tabComponent:'ChatPage',index: 1, icon: 'ios-chatboxes' },
          { title: 'LOGOUT', pageName: 'test',tabComponent:'test', icon: 'md-log-out' }
        ];
       
              }else if(vals="Sales Satff"){

                this.pages = [
                  { title: 'DASHBOARD', pageName: 'UserdashboardPage', tabComponent: 'UserdashboardPage', index: 0, icon: 'home' },
                  { title: 'SALES REPORT', pageName: 'SalesPage', tabComponent: 'SalesPage', index: 1, icon: 'md-paper' },
                  { title: 'STOCK REPORT', pageName: 'StockPage', tabComponent: 'StockPage', index: 1, icon: 'md-paper' },
                  { title: 'CHAT', pageName: 'ChatPage',tabComponent:'ChatPage',index: 1, icon: 'ios-chatboxes' },
                  { title: 'LOGOUT', pageName: 'test',tabComponent:'test', icon: 'md-log-out' }
                ];
               
              }else if(vals="Services Admin"){
                this.pages= [
                  { title: 'DASHBOARD', pageName: 'UserdashboardPage', tabComponent: 'UserdashboardPage', index: 0, icon: 'home' },
                  { title: 'UPLOAD SERVICES REPORT', pageName: 'ServiceReportPage', tabComponent: 'ServiceReportPage', index: 1, icon: 'md-people' },
                  { title: 'SERVICE REPORT', pageName: 'ServicesPage', tabComponent: 'ServicesPage', index: 1, icon: 'md-people' },
                  { title: 'CHAT', pageName: 'ChatPage',tabComponent:'ChatPage',index: 1, icon: 'ios-chatboxes' },
                  { title: 'LOGOUT', pageName: 'test',tabComponent:'test', icon: 'md-log-out' }
                ]; 
              }else if(vals="Services Staff"){
                this.pages= [
                  { title: 'DASHBOARD', pageName: 'UserdashboardPage', tabComponent: 'UserdashboardPage', index: 0, icon: 'home' },
                  { title: 'SERVICE REPORT', pageName: 'ServicesPage', tabComponent: 'ServicesPage', index: 1, icon: 'md-people' },
                  { title: 'CHAT', pageName: 'ChatPage',tabComponent:'ChatPage',index: 1, icon: 'ios-chatboxes' },
                  { title: 'LOGOUT', pageName: 'test',tabComponent:'test', icon: 'md-log-out' }
                ];
              }
          });
      
          storage.get('name').then((vals) => {
            this.name=vals;
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuonePage');
  }

  openPage(page: PageInterface) {
    let params = {};
   

    if(page.pageName == "test"){
   
      this.storage.set('status',"");
      this.storage.set('designation',"");
      this.storage.set('name',"");
     // this.navCtrl.setRoot(LoginPage);
    // this.navCtrl.push(LoginPage).then(()=>{this.navCtrl.remove(-1)});
   // this.appCtrl.getRootNav().setRoot(DashboardPage);
    this.appCtrl.getRootNav().setRoot(LoginPage);
    this.navCtrl.remove(1);
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
        this.viewCtrl.dismiss();

        this.appCtrl.getRootNav().setRoot(page.pageName, params);
        
      }
    }
   // this.navCtrl.setRoot(page.pageName);
   
 
    // The index is equal to the order of our tabs inside tabs.ts
    

    
    


  }
/*
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }*/

 
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
