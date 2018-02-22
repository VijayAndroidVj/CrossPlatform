import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  postaddeventList:any;
  custDate:any;
  event = { eid: "", toeid: "", name: "", task: "", start_date: "", start_time: "" , end_time: "" , end_date: "" , feedback: ""  }; 


  constructor(public navCtrl: NavController,public nav:Nav, public navParams: NavParams,public alertCtrl: AlertController,
    public storage: Storage,public restProvider: RestProvider) {

      this.inilizepage();

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


  inilizepage(){
    this.storage.get('sid').then((sid) => {

      if(sid){
        this.storage.get('bid').then((bid) => {

          if(bid){
            this.storage.get('aid').then((aid) => {
              if(aid){
                this.getLed(sid,bid,aid);
                this.event.eid=aid;
              }
            });
          }       
              });
      } 
          });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  getLed(sid,bid,aid){
    this.restProvider.getLeads(sid,bid,aid)
    .then(data => {
     this.postaddeventList = data;
    //  console.log(this.postaddCustList);
    });
  }

  

  save() {
    
    this.restProvider.addtask(this.event).then((result) => {
      console.log(result);
      this.custDate=result["success"];
      if(this.custDate == 1){
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Event saved successfully',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
       
      }else{
        let alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: result["message"],
          buttons: ['OK']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Failed!',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
     
    });

}
}
