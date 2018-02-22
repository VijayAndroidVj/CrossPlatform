import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Nav } from 'ionic-angular';
import { LeadDetailsPage } from '../lead-details/lead-details';
import { AddLeadPage } from '../add-lead/add-lead';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LeadManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lead-management',
  templateUrl: 'lead-management.html',
})
export class LeadManagementPage {
  postList: any;

  constructor(public navCtrl: NavController,public nav:Nav, public navParams: NavParams,private alertCtrl: AlertController,private storage: Storage,public restProvider: RestProvider) {
   this.inilizepage(); 
 
  }

  inilizepage(){
    this.storage.get('sid').then((sid) => {

      if(sid){
        this.storage.get('bid').then((bid) => {

          if(bid){
            this.storage.get('aid').then((aid) => {
              if(aid){
                this.getLed(sid,bid,aid);
              }
            });
          }       
              });
      } 
          });

  }

  getLed(one,twi,three) {
    this.restProvider.getLeads(one,twi,three)
    .then(data => {
     this.postList = data;
      console.log(this.postList);
    });
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadManagementPage');
  }
  openLEADpage(broker){
    this.navCtrl.push(LeadDetailsPage,broker);
}
addLead(){
  this.navCtrl.push(AddLeadPage)
}

deleteItem(id){
  let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete this lead?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Okay',
        handler: () => {
         this.deletes(id);
        }
      }
    ]
  });
  alert.present();
}


deletes(id){
  this.restProvider.deleteLead(id)
  .then(data => {
    this.inilizepage();
  });

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
