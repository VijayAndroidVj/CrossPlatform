import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LeadDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lead-details',
  templateUrl: 'lead-details.html',
})
export class LeadDetailsPage {
 tag:boolean=true;
  broker:any;
  constructor(public navCtrl: NavController,public nav:Nav,public storage:Storage, public navParams: NavParams,public toastCtrl: ToastController,public restProvider: RestProvider) {
    
    this.broker = this.navParams.data;
    console.log(this.broker);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadDetailsPage');
  }

  edit(){
this.tag=false;
  }
  updateleadServer(){
    this.restProvider.updateLead(this.broker,this.broker.eid).then((result) => {
      console.log(result);  
      if(result["success"]== 1){
        let toast = this.toastCtrl.create({
          message: result["message"],
          duration: 3000
        });
         toast.present();


      this.navCtrl.pop();
      }else{        
        let toast = this.toastCtrl.create({
          message: result["message"],
          duration: 3000
        });
         toast.present();
      }
    }, (err) => {
      console.log(err);
      let toast = this.toastCtrl.create({
        message:err,
        duration: 3000
      });
       toast.present();
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
