import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Nav} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ViewTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-task',
  templateUrl: 'view-task.html',
})
export class ViewTaskPage {
  broker : any;
  task:any;
  vale:any;
   //= { eid: "", toeid: "", name: "", task: "", start_date: "", start_time: "" , end_time: "" , end_date: "" , feedback: "",status:""  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public restProvider: RestProvider,public nav:Nav,public storage: Storage) {
    this.broker = this.navParams.data;
    this.task = this.navParams.data;
    console.log('Your event is'+this.navParams.data, this.navParams.data);
    storage.get('eid').then((val) => {
      this.vale = val;
     // this.customer.eid=val;
      console.log('Your age is', val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTaskPage');
  }
  updatetaskstatus(){
    if( this.vale != "0"){
      if(this.task.feedback != "" && this.task.feedback != undefined){
        this.restProvider.updatetaskStatus( this.vale,this.task.feedback)
        .then(data => {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Task closed successfully',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
  
         // console.log(this.customerList);
        });
      }else{
        let alert = this.alertCtrl.create({
          title: 'ERROR!',
          subTitle: 'Please enter feedback!...',
          buttons: ['OK']
        });
        alert.present();
       
  
       // this.utils.openFilters(NO_INTERNET_CONNECTION)
      }
    }else{
      let alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: 'Access Denied',
        buttons: ['OK']
      });
      alert.present();
    }
    
   
  }
}
