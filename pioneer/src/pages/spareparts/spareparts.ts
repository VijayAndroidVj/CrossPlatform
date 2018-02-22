import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Nav} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the SparepartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spareparts',
  templateUrl: 'spareparts.html',
})
export class SparepartsPage {
  postList:any;
  lead = { cid: '', date: '',spare_part_count: ''};
  custome= { cid: '', start_date: '',end_date: ''};
  postListfive:any;
  superAdmin:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public nav:Nav,
    public restProvider: RestProvider,
    public toastCtrl: ToastController) {
    storage.get('aid').then((val) => {
      console.log('Your age is', val);
      this.lead.cid=val;
      this.custome.cid=val;

      if(val == 0){
        this.superAdmin =false;
      }else{
        this.superAdmin =true;
      }
          });

          this.getbranch(1);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SparepartsPage');
  }


  getbranch(bal) {
    this.restProvider.getAdminById(bal)
    .then(data => {
     this.postListfive = data;
      console.log(this.postList);
    });
  }

  onSubmit(){
    this.restProvider.addSpare(this.lead.cid,this.lead.date,this.lead.spare_part_count).then((result) => {
      console.log(result);
   
      if(result["success"] == 1){
        let toast = this.toastCtrl.create({
          message: result["message"],
          duration: 2000
        });
         toast.present();
      }else{        
        let toast = this.toastCtrl.create({
          message: result["message"],
          duration: 2000
        });
         toast.present();
      }
    }, (err) => {
      console.log(err);
      let toast = this.toastCtrl.create({
        message:err,
        duration: 2000
      });
       toast.present();
    });
  }


  getEnqReport(){
    //let sdate = this.datePipe.transform(new Date(this.custome.start_date), 'yyyy-MM-dd');
    // /let edate= this.datePipe.transform(new Date(this.custome.end_date), 'yyyy-MM-dd');
    this.restProvider.getSpare(this.custome.cid,this.custome.start_date,this.custome.end_date)
    .then(data => {
     this.postList = data["report"];
    });

  }

}
