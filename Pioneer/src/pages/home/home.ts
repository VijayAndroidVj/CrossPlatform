//import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';

import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import {App} from "ionic-angular"
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myNav') nav: NavController
  
   registerCredentials = { email: '', password: '' };
   
    username="";
    password="";
   
    items=[]; 
    newData: any;
  fcm="";

  constructor(public navCtrl: NavController, protected app: App,public toastCtrl: ToastController,private storage: Storage,public navParams: NavParams,public restProvider: RestProvider,public http: HttpClient) {
    this.http = http;

    storage.get('token').then((val) => {
      console.log('Your token is', val);
    // alert(val);
     this.fcm=val;
   // alert(val);
   //test
   
          });
  }

  submit() {
     
    //this.app.getRootNav().setRoot(HomePage)
    var link = 'https://itmspl.com/pioneer/add_user.php?username='+this.registerCredentials.email+'&&password='+this.registerCredentials.password;
   // var data = JSON.stringify({username: this.data.username});
    
    this.http.get(link)
    .subscribe(data => {
      this.newData=data["success"];
      if(this.newData == 1){
        let toast = this.toastCtrl.create({
          message: data["message"],
          duration: 3000
        });
        this.storage.set('sid', data["sid"]);
        this.storage.set('bid', data["bid"]);
        this.storage.set('aid', data["aid"]);
        this.storage.set('eid', data["eid"]);
        this.storage.set('status', data["status"]);
        this.storage.set('designation', data["designation"]);
        this.storage.set('name', data["name"]);
        this.storage.set('mobile', data["mobile"]);
        //this.storage.set('username',this.registerCredentials.email);
       // this.storage.set('password', this.registerCredentials.password);
         toast.present();

         if(data["status"] == "1"){ 
          this.navCtrl.setRoot('MenuPage');
        }else if(data["status"] == "2"){
          this.navCtrl.setRoot('MenusPage');
        }else if(data["status"] == "3"){
          this.navCtrl.setRoot('MenuonePage');
         
          // if(data["designation"] == "Sales Admin"){
           

          // }else if(data["designation"] == "Sales Staff"){
          //   this.navCtrl.setRoot('MenutwoPage');
            
          // }else if(data["designation"] == "Services Admin"){
          //   this.navCtrl.setRoot('MenuthreePage');

          // }else if(data["designation"] == "Services Staff"){
          //   this.navCtrl.setRoot('MenufourPage');
          // }
        }
         //this.app.getRootNav().setRoot(HomePage)
        //this.navCtrl.push(HomePage);
        
      }else{
        let toast = this.toastCtrl.create({
          message: data["message"],
          duration: 3000
        });
        toast.present();
      }
       // this.data.response = data._body;
      // console.log(data);
      

    }, error => {
        console.log("Oooops!");
    });
}
nextPage()
{

}

}
