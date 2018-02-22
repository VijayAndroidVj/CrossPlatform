import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdminPage } from '../admin/admin';
import {  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the AddAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-admin',
  templateUrl: 'add-admin.html',
})
export class AddAdminPage implements OnInit{
  user: FormGroup;
  leadData:any
  item = [];
  postList:any;
  sidss:"";
  custome:any;
  Caption:string="Add";


  //user = { bid: '', sid: '',name: '', email: '', mobile: '',username: "",password:"" };



  constructor(public navCtrl: NavController,public storage: Storage,public nav:Nav, public navParams: NavParams,public toastCtrl: ToastController,public restProvider: RestProvider) {
    storage.get('sid').then((val) => {
      console.log('Your age is', val);
    this.sidss =val;
      this.getbranch(val);
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

  ngOnInit() {
 
    this.user = new FormGroup({
      bid:new FormControl('',[Validators.required,Validators.nullValidator]),
      sid:new FormControl('',[]),
      name:new FormControl('',[Validators.required,Validators.nullValidator]),
      email: new FormControl('', [Validators.required,Validators.email]),
       mobile: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
       username:new FormControl('',[Validators.required,Validators.nullValidator]),
      password:new FormControl('',[Validators.required,Validators.nullValidator])
   
    });
    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdminPage');
  }
  getbranch(bal) {
    this.restProvider.getBranch(bal)
    .then(data => {
     this.postList = data;
      console.log(this.postList);
    });
  } 

  bit(val){
    this.user.value.bid=val;
  }

 



  onSubmit(user){
    this.user.value.sid= this.sidss;
    
    this.restProvider.adAdmin(user.value).then((result) => {
      console.log(result);
      this.leadData=result["success"];
      if(this.leadData == 1){
        let toast = this.toastCtrl.create({
          message: result["message"],
          duration: 3000
        });
         toast.present();


      this.navCtrl.setRoot(AdminPage);
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
