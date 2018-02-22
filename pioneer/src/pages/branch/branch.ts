import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AddBranchPage } from '../add-branch/add-branch';
import { Storage } from '@ionic/storage';
import { BranchDetailsPage } from '../branch-details/branch-details';

/**
 * Generated class for the BranchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-branch',
  templateUrl: 'branch.html',
})
export class BranchPage {
  postList: any;

  constructor(public navCtrl: NavController,private storage: Storage,public nav:Nav,private alertCtrl: AlertController, public navParams: NavParams,public restProvider: RestProvider) {
    
this.initilize();
  }

  initilize(){

    this.storage.get('sid').then((val) => {
      console.log('Your age is', val);
    
      this.getbranch(val);
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchPage');
  }

  getbranch(bal) {
    this.restProvider.getBranch(bal)
    .then(data => {
     this.postList = data;
      console.log(this.postList);
    });
  }
  
  deleteItem(id){
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete this branch?',
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
    this.restProvider.deleteBranch(id)
    .then(data => {
      this.initilize();
    });

  }
  addLead(){
    this.navCtrl.push(AddBranchPage)
  }
  openLEADpage(branch){

this.navCtrl.push(BranchDetailsPage,branch);
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
