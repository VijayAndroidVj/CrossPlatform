import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AdminDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-details',
  templateUrl: 'admin-details.html',
})
export class AdminDetailsPage {
custome:any;
List:any;
  constructor(public navCtrl: NavController,public nav:Nav,public storage: Storage, public navParams: NavParams,public appCtrl:App,public restProvider: RestProvider) {
    this.custome =  this.navParams.data;
    this.getbranch(this.custome.bid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDetailsPage');
  }
  getbranch(val){
    this.restProvider.getBranchById(val)
    .then(data => {
     this.List = data;
     // console.log(this.customerList);
    });
  }

  // click(){
  //   this.appCtrl.getRootNav().setRoot(DashboardPage);
  // }
  goback() {
    this.storage.get('status').then((val) => {
      if(val == "1"){ 
        this.nav.setRoot('DashboardPage');
      }else if(val == "2"){
        this.nav.setRoot('AdminDashboardPage');
      }else if(val == "3"){
        this.nav.setRoot('UserdashboardPage');
      }
          });
  }

 

}
