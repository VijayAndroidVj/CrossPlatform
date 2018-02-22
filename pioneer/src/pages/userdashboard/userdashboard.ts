import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserdashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdashboard',
  templateUrl: 'userdashboard.html',
})
export class UserdashboardPage {
  postList :any;
  salsadmin:boolean=false;
  salsstaff:boolean=false;
  serviceadmin:boolean=false;
  servicesStaff:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage,public restProvider: RestProvider) {
    storage.get('designation').then((val) => {
      if(val="Sales Admin"){
this.salsadmin=true;
      }else if(val="Sales Satff"){
        this.salsstaff=true;
      }else if(val="Services Admin"){
        this.serviceadmin=true;
      }else if(val="Services Staff"){
        this.servicesStaff=true;
      }
  
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdashboardPage');
  }
 

  openNavi(pagess){
    this.navCtrl.setRoot(pagess);
   }

}
