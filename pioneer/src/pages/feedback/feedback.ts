import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  postList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public nav:Nav,public storage: Storage,public restProvider: RestProvider) {
    storage.get('aid').then((val) => {
      console.log('Your age is', val);
      this.getLed(val);
    });
  }

  getLed(id) {
    this.restProvider.getFeddback(id)
    .then(data => {
     this.postList = data;
      console.log(this.postList);
     
    });
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
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
