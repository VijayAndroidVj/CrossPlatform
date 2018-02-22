import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';
import { LeadManagementPage } from '../lead-management/lead-management';
import { Storage } from '@ionic/storage';
import {  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
/**
 * Generated class for the AddLeadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-lead',
  templateUrl: 'add-lead.html',
})
export class AddLeadPage implements OnInit{
  leadData:any
  item = [];
  sidss="";
  bidss="";
  aidss="";
  user: FormGroup;

  //lead = { username: '', password: '',name: '', designation: '', mobileno: '', email: '', sid: "",bid: "",aid: "" };


  constructor(public navCtrl: NavController, public navParams: NavParams,public nav : Nav,public storage: Storage  ,public toastCtrl: ToastController,public restProvider: RestProvider) {
   
    // storage.get('aid').then((val) => {
    //   console.log('Your age is', val);
    //   this.lead.aid=val;
    //       });
    //       storage.get('eid').then((val) => {
    //         console.log('Your age is', val);
    //         this.lead.empid=val;
    //             });

    storage.get('sid').then((sid) => {
      
            if(sid){
              this.sidss=sid;

              storage.get('bid').then((bid) => {
      
                if(bid){
              this.bidss=bid;
              
                  storage.get('aid').then((aid) => {
                    if(aid){
              this.aidss=aid;                     
                    }
                  });
                }       
                    });
            } 
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
        username:new FormControl('',[Validators.required,Validators.nullValidator]),
        password:new FormControl('',[Validators.required,Validators.nullValidator]),
         name:new FormControl('',[Validators.required,Validators.nullValidator]),
         designation:new FormControl('',[Validators.required,Validators.nullValidator]),
         mobileno: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
         email: new FormControl('', [Validators.required,Validators.email]),
         sid:new FormControl('',[]),
         bid:new FormControl('',[]),
         aid:new FormControl('',[])
      
       });
       
       }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLeadPage');
  }
  onSubmit(user){
    this.user.value.sid=this.sidss;
    this.user.value.bid=this.bidss;
    this.user.value.aid=this.aidss;
    // this.item.push(this.lead)
     this.restProvider.addLeads(user.value).then((result) => {
       console.log(result);
       this.leadData=result["success"];
       if(this.leadData == 1){
         let toast = this.toastCtrl.create({
           message: result["message"],
           duration: 3000
         });
          toast.present();
 
 
       this.navCtrl.setRoot(LeadManagementPage);
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
