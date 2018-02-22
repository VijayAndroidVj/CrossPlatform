import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,Nav} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';
import { Content } from 'ionic-angular';
import{LoadingController} from 'ionic-angular';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  doughnutChart: any;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild(Content) content: Content;
  sample=[];
  sampleOne=[];
  postList:any;
  flas:boolean=false;
  barChart: any;
  postListone:any;
  postListfive:any;
  custome = {eid:"",aid:"",start_date:"",end_date:"",model:""}

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public navParams: NavParams,public toastCtrl: ToastController,public nav:Nav,public storage: Storage,public restProvider: RestProvider) {
    storage.get('aid').then((aid) => {
      console.log('Your age is', aid);
      // if(aid==0){
      //   aid=1;
      // }
      this.custome.aid=aid;
      storage.get('eid').then((val) => {
        this.custome.eid=val;
        if(aid == "0" && val=="0" ){
          this.flas=true;
        }
            });
          });
         
                this.getbranch(1);  
  }

  getbranch(bal) {
    this.restProvider.getAdminById(bal)
    .then(data => {
     this.postListfive = data;
      console.log(this.postList);
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


  mcqAnswer(value)
  {
   if(value ==1){
    this.sample=[];
    this.sampleOne=[];
    this.barChart.destroy();
    for(let i=0;i<this.postListone .length;i++){
      this.sample.push(this.postListone [i]["modelname"]);
      this.sampleOne.push(this.postListone [i]["count"]);
      }
      this.ionViewDidLoad(this.sample, this.sampleOne);
      this.content.scrollToTop(200);
   }
  }


  clear(){
    this.custome.model="";
   }
  getEnqReport(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    // let sdate = this.datePipe.transform(new Date(this.custome.start_date), 'dd/MM/yyyy');
     //let edate= this.datePipe.transform(new Date(this.custome.end_date), 'dd/MM/yyyy');
     this.restProvider.getService(this.custome.aid,this.custome.start_date,this.custome.end_date,this.custome.model)
     .then(data => {
      this.postList =[];
      this.postListone=[];
      this.postList = data["report"];
     this.postListone = data["models"];
     
     loading.dismiss();
     for(let i=0;i<data["models"].length;i++){
        this.sample.push(data["models"][i]["modelname"]);
        this.sampleOne.push(data["models"][i]["count"]);
        }
        this.ionViewDidLoad(this.sample, this.sampleOne);
     });
     setTimeout(() => {
      loading.dismiss();
    }, 5000);
 
   }

   ionViewDidLoad(datasss,val) {

    Chart.defaults.global.legend.position = 'bottom';
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      
                 type: 'doughnut',
                 options: {
                    responsive: true,
                    maintainAspectRatio: false,        
                  },
                 data: {
                    labels: datasss,
                     datasets: [{
                         label: '# of Votes',
                         data: val,
                         backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',  
                          'rgba(54, 162, 235, 0.2)',  
                          'rgba(255, 206, 86, 0.2)',  
                          'rgba(255, 160, 122, 0.2)', 
                          'rgba(128,0,0, 0.2)',       
                          'rgba(47,79,79, 0.2)',      
                          'rgba(255,20,147, 0.2)',    
                          'rgba(75,0,130, 0.2)',      
                          'rgba(0,191,255, 0.2)',     
                          'rgba(0,139,139, 0.2)',     
                          'rgba(0,255,255, 0.2)',  	
                          'rgba(0.255.0, 0.2)',   	
                          'rgba(255,255,0, 0.2)',  	 
                          'rgba(255,0,0, 0.2)',   	
                          'rgba(152,251,152, 0.2)',	
                          'rgba(0,255,255, 0.2)',   	
                          'rgba(0,0,255, 0.2)',   	
                          'rgba(255,0,255, 0.2)', 	
                          'rgba(124,252,0, 0.2)',  	
                          'rgba(0,255,1272, 0.2)',  	
                          'rgba(186,85,211, 0.2)', 	
                          'rgba(139,0,139, 0.2)',  	
                          'rgba(248,248,255, 0.2)',	
                          'rgba(218,165,32, 0.2)',  	
                          'rgba(165,42,42, 0.2)',   	
                          'rgba(148,0,211, 0.2)',  	
                          'rgba(0,128,0, 0.2)',   	
                          'rgba(255,215,0, 0.2)', 	
                          'rgba(0,191,255, 0.2)',	
                          'rgba(255,69,0, 0.2)',   	 
                          'rgba(255, 99, 132, 0.2)',  
                          'rgba(54, 162, 235, 0.2)',  
                          'rgba(255, 206, 86, 0.2)',  
                          'rgba(255, 160, 122, 0.2)', 
                          'rgba(128,0,0, 0.2)',       
                          'rgba(47,79,79, 0.2)',      
                          'rgba(255,20,147, 0.2)',    
                          'rgba(75,0,130, 0.2)',      
                          'rgba(0,191,255, 0.2)',     
                          'rgba(0,139,139, 0.2)',     
                          'rgba(0,255,255, 0.2)',  	
                          'rgba(0.255.0, 0.2)',   	
                          'rgba(255,255,0, 0.2)',  	 
                          'rgba(255,0,0, 0.2)',   	
                          'rgba(152,251,152, 0.2)',	
                          'rgba(0,255,255, 0.2)',   	
                          'rgba(0,0,255, 0.2)',   	
                          'rgba(255,0,255, 0.2)', 	
                          'rgba(124,252,0, 0.2)',  	
                          'rgba(0,255,1272, 0.2)',  	
                          'rgba(186,85,211, 0.2)', 	
                          'rgba(139,0,139, 0.2)',  	
                          'rgba(248,248,255, 0.2)',	
                          'rgba(218,165,32, 0.2)',  	
                          'rgba(165,42,42, 0.2)',   	
                          'rgba(148,0,211, 0.2)',  	
                          'rgba(0,128,0, 0.2)',   	
                          'rgba(255,215,0, 0.2)', 	
                          'rgba(0,191,255, 0.2)',	
                          'rgba(255,69,0, 0.2)',   	 
                          'rgba(255, 99, 132, 0.2)',  
                          'rgba(54, 162, 235, 0.2)',  
                          'rgba(255, 206, 86, 0.2)',  
                          'rgba(255, 160, 122, 0.2)', 
                          'rgba(128,0,0, 0.2)',       
                          'rgba(47,79,79, 0.2)',      
                          'rgba(255,20,147, 0.2)',    
                          'rgba(75,0,130, 0.2)',      
                          'rgba(0,191,255, 0.2)',     
                          'rgba(0,139,139, 0.2)',     
                          'rgba(0,255,255, 0.2)',  	
                          'rgba(0.255.0, 0.2)',   	
                          'rgba(255,255,0, 0.2)',  	 
                          'rgba(255,0,0, 0.2)',   	
                          'rgba(152,251,152, 0.2)',	
                          'rgba(0,255,255, 0.2)',   	
                          'rgba(0,0,255, 0.2)',   	
                          'rgba(255,0,255, 0.2)', 	
                          'rgba(124,252,0, 0.2)',  	
                          'rgba(0,255,1272, 0.2)',  	
                          'rgba(186,85,211, 0.2)', 	
                          'rgba(139,0,139, 0.2)',  	
                          'rgba(248,248,255, 0.2)',	
                          'rgba(218,165,32, 0.2)',  	
                          'rgba(165,42,42, 0.2)',   	
                          'rgba(148,0,211, 0.2)',  	
                          'rgba(0,128,0, 0.2)',   	
                          'rgba(255,215,0, 0.2)', 	
                          'rgba(0,191,255, 0.2)',	
                          'rgba(255,69,0, 0.2)',   	                                                                               
                          'rgba(255, 159, 64, 0.2)'
                            
                         ],
                         hoverBackgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                           "#FFA07A",
                           "	800000",
                           "#2F4F4F",
                           "#FF1493",
                            "#4B0082",
                             "00BFFF",
                            "#008B8B",
                            "#00FFFF",
                           "#00FF00",
                           "#FFFF00",
                           "#FF0000",
                           "#98FB98",
                           "#00FFFF",
                           "#0000FF",
                             "#FF00FF",
                            "#7CFC00",
                            "#00FF7F",
                             "#BA55D3",
                            "#8B008B",
                              "F8F8FF",
                            "#DAA520",
                             "#A52A2A", 
                            "#9400D3",
                           "#008000",
                             "#FFD700",
                            "#00BFFF",
                               "#36A2EB",
                               "#FF6384",
                               "#36A2EB",
                               "#FFCE56",
                                "#FFA07A",
                                "	800000",
                                "#2F4F4F",
                                "#FF1493",
                                 "#4B0082",
                                  "00BFFF",
                                 "#008B8B",
                                 "#00FFFF",
                                "#00FF00",
                                "#FFFF00",
                                "#FF0000",
                                "#98FB98",
                                "#00FFFF",
                                "#0000FF",
                                  "#FF00FF",
                                 "#7CFC00",
                                 "#00FF7F",
                                  "#BA55D3",
                                 "#8B008B",
                                   "F8F8FF",
                                 "#DAA520",
                                  "#A52A2A", 
                                 "#9400D3",
                                "#008000",
                                  "#FFD700",
                                 "#00BFFF",
                                    "#36A2EB",
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56",
                                     "#FFA07A",
                                     "	800000",
                                     "#2F4F4F",
                                     "#FF1493",
                                      "#4B0082",
                                       "00BFFF",
                                      "#008B8B",
                                      "#00FFFF",
                                     "#00FF00",
                                     "#FFFF00",
                                     "#FF0000",
                                     "#98FB98",
                                     "#00FFFF",
                                     "#0000FF",
                                       "#FF00FF",
                                      "#7CFC00",
                                      "#00FF7F",
                                       "#BA55D3",
                                      "#8B008B",
                                        "F8F8FF",
                                      "#DAA520",
                                       "#A52A2A", 
                                      "#9400D3",
                                     "#008000",
                                       "#FFD700",
                                      "#00BFFF",
                                         "#36A2EB",                                                                                          
                                   "#36A2EB"
                         ]
                     }]
                 }
      
             }); 
    // Chart.defaults.global.tooltips.enabled = true;
    // Chart.defaults.global.legend.position = 'bottom';
   
   
    // this.barChart = new Chart(this.barCanvas.nativeElement, {

    //     type: 'bar',
        
    //     data: {
          
    //         labels: datasss,
    //         datasets: [{
    //             label: "By Model",
    //             data:val,
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)',
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)',
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false, 
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero:true
    //                 }
    //             }]
    //         }
    //     }

    // });




  }

}
