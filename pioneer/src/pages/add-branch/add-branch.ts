import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';
import { BranchPage } from '../branch/branch';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddBranchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-branch',
  templateUrl: 'add-branch.html',
})
export class AddBranchPage {
  leadData:any
  item = [];
  custome:any;
  Caption:string="Add";

  lead = { door_no: '', street: '',city: '', state: '', pincode: '',sid: "" };


  constructor(public navCtrl: NavController,public nav:Nav,public storage: Storage, public navParams: NavParams,public toastCtrl: ToastController,public restProvider: RestProvider) {

    this.custome =  this.navParams.data;

    if(!this.isEmptyObject(this.custome)) {
this.Caption="Update";
this.lead.door_no=this.custome.door_no;
this.lead.street=this.custome.street;
this.lead.city=this.custome.city;
this.lead.state=this.custome.state;
this.lead.pincode=this.custome.pincode;
    }


    storage.get('sid').then((val) => {
      console.log('Your age is', val);
      this.lead.sid=val;
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBranchPage');
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

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  addleadServer (){

    if(!this.isEmptyObject(this.custome)) {

      this.restProvider.updateBranch(this.lead,this.custome.id).then((result) => {
        console.log(result);
        this.leadData=result["success"];
        if(this.leadData == 1){
          let toast = this.toastCtrl.create({
            message: result["message"],
            duration: 3000
          });
           toast.present();
  
  
        this.navCtrl.setRoot(BranchPage);
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


    }else{
     this.restProvider.addCustomer(this.lead).then((result) => {
       console.log(result);
       this.leadData=result["success"];
       if(this.leadData == 1){
         let toast = this.toastCtrl.create({
           message: result["message"],
           duration: 3000
         });
          toast.present();
 
 
       this.navCtrl.setRoot(BranchPage);
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
   }

}
