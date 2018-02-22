import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,Nav} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { AddAdminPage } from '../add-admin/add-admin';
import { AdminDetailsPage } from '../admin-details/admin-details';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  postList: any;

  constructor(public navCtrl: NavController,public nav:Nav, public navParams: NavParams,private alertCtrl: AlertController,private storage: Storage,public restProvider: RestProvider) {
 this.inilizepahe();   
  }

  inilizepahe(){
    this.storage.get('sid').then((val) => {
      console.log('Your age is', val);
      this.getLed(val);
          });
  }

  getLed(one) {
    this.restProvider.getAdmin(one)
    .then(data => {
     this.postList = data;
      console.log(this.postList);
    });
  } 


  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  openLEADpage(broker){
    this.navCtrl.push(AdminDetailsPage,broker);
}
addLead(){
  this.navCtrl.push(AddAdminPage)
}

deleteItem(id){
  let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete this admin?',
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
  this.restProvider.deleteAdmin(id)
  .then(data => {
    this.inilizepahe();
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
