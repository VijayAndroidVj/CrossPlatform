import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { Chart } from 'chart.js';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';






/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild(Nav) nav: Nav;
  doughnutChart: any;
  postList = [{title:"test1"},{title:"test2"},{title:"test3"},{title:"test4"},{title:"test5"}];
  users: any;
  confirm :any;
  possitive :any;
  negative : any;
  installed : any;
  notify:any;
  lead = { title: '', description: '',aid: "1" };
  @ViewChild('doughnutCanvas') doughnutCanvas;
  
     barChart: any;

  constructor(public navCtrl: NavController,storage: Storage,public navParams: NavParams,public restProvider: RestProvider,public toastCtrl: ToastController) {


    storage.get('aid').then((val) => {
      console.log('Your token is', val);
     this.lead.aid=val;
   // alert(val);
   
          });
  }


  addOfferServer(){
    this.restProvider.addNotification(this.lead.aid,this.lead.title,this.lead.description).then((result) => {
      console.log(result);
      if(result["result"] == "success"){
        let toast = this.toastCtrl.create({
          message: result["message"],
          duration: 3000
        });
         toast.present();
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

   openNavi(pagess){
    this.navCtrl.setRoot(pagess);
   }




 
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    //Chart.defaults.global.tooltips.enabled = false;
    Chart.defaults.global.legend.position = 'bottom';
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      
                 type: 'doughnut',
                 options: {
                    responsive: true,
                    maintainAspectRatio: false,        
                  },
                 data: {
                    labels: ["negative", "possitive", "installed", "Confirmed"],
                     datasets: [{
                         label: '# of Votes',
                         data: [1,2,3,4],
                         backgroundColor: [
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(54, 162, 235, 0.2)',
                             'rgba(255, 206, 86, 0.2)',
                             'rgba(75, 192, 192, 0.2)',
                            /* 'rgba(153, 102, 255, 0.2)',
                             'rgba(255, 159, 64, 0.2)' */
                         ],
                         hoverBackgroundColor: [
                             "#FF6384",
                             "#36A2EB",
                             "#FFCE56",
                             "#FF6384",
                            /*  "#36A2EB",
                             "#FFCE56" */
                         ]
                     }]
                 }
      
             }); 

}
}
