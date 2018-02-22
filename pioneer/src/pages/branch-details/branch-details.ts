import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { AddBranchPage } from '../add-branch/add-branch';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the BranchDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-branch-details',
  templateUrl: 'branch-details.html',
})
export class BranchDetailsPage {
  custome:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav,public storage:Storage) {
    this.custome =  this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchDetailsPage');
  }

  Update(){
    this.navCtrl.push(AddBranchPage,this.custome);
  }

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
