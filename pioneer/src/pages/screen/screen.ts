import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-screen',
  templateUrl: 'screen.html',
})
export class ScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    storage.get('status').then((val) => {
      if(val == "1"){ 
        this.navCtrl.setRoot('MenuPage');
      }else if(val == "2"){
        this.navCtrl.setRoot('MenusPage');
       
      }else if(val == "3"){
        this.navCtrl.setRoot('MenuonePage');
      }else{
        this.navCtrl.setRoot('LoginPage');
      }

    
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreenPage');
  }

}
