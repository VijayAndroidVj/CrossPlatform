import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';
import { Content } from 'ionic-angular';
import{LoadingController} from 'ionic-angular';

/**
 * Generated class for the SalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {
  doughnutChart: any;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  
    
  @ViewChild('barCanvas') barCanvas;
  @ViewChild(Content) content: Content;
  sampledata:number=30;
  total;
  flas:boolean=false;
 sample=[];
 sampleOne=[];
    barChart: any;
  postList:any;
  postListone:any;
  postListtwo:any;
  postListthree:any;
  postListfive:any;
  postListsix:any;
  postListseven:any;
  postListfour:any;
  custome = {eid:"",aid:"",start_date:"",end_date:"",model:"",color:"",pincode:""}
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public toastCtrl: ToastController,public nav:Nav,public storage: Storage,public restProvider: RestProvider) {
    
    
    storage.get('aid').then((aid) => {
      console.log('Your age is', aid);
      // if(val==0){
      //   val=1;
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

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
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
      this.doughnutChart.destroy();
      for(let i=0;i<this.postListone.length;i++){
        this.sample.push(this.postListone[i]["modelname"]);
        this.sampleOne.push(this.postListone[i]["count"]);
        }
        this.ionViewDidLoad(this.sample, this.sampleOne);
        
        this.content.scrollToTop(200);
        
       
     }else if(value ==2){
      this.sample=[];
      this.sampleOne=[];
      this.doughnutChart.destroy();
      for(let i=0;i<this.postListtwo.length;i++){
        this.sample.push(this.postListtwo[i]["colorname"]);
        this.sampleOne.push(this.postListtwo[i]["count"]);
        }
        this.ionViewDidLoad(this.sample, this.sampleOne);
        this.content.scrollToTop(200);

     }else if(value ==3){
      this.sample=[];
      this.sampleOne=[];
      this.doughnutChart.destroy();
      for(let i=0;i<this.postListthree.length;i++){
        this.sample.push(this.postListthree[i]["pincode"]);
        this.sampleOne.push(this.postListthree[i]["count"]);
        }
        this.ionViewDidLoad(this.sample, this.sampleOne);
        this.content.scrollToTop(200);
           }
           else if(value ==4){
            this.sample=[];
            this.sampleOne=[];
            this.doughnutChart.destroy();
            for(let i=0;i<this.postListsix.length;i++){
              this.sample.push(this.postListsix[i]["net_amt"]);
              this.sampleOne.push(this.postListsix[i]["count"]);
              }
              this.ionViewDidLoad(this.sample, this.sampleOne);
              this.content.scrollToTop(200);
                 }
                 else if(value ==5){
                  this.sample=[];
                  this.sampleOne=[];
                  this.doughnutChart.destroy();
                  for(let i=0;i<this.postListseven.length;i++){
                    this.sample.push(this.postListseven[i]["extended_warrenty"]);
                    this.sampleOne.push(this.postListseven[i]["count"]);
                    }
                    this.ionViewDidLoad(this.sample, this.sampleOne);
                    this.content.scrollToTop(200);
                       }
                       else if(value ==6){
                        this.sample=[];
                        this.sampleOne=[];
                        this.doughnutChart.destroy();
                        for(let i=0;i<this.postListfour.length;i++){
                          this.sample.push(this.postListfour[i]["teflon"]);
                          this.sampleOne.push(this.postListfour[i]["count"]);
                          }
                          this.ionViewDidLoad(this.sample, this.sampleOne);
                          this.content.scrollToTop(200);
                             }
    }
 
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SalesPage');
  // }
  clear(){
    this.content.scrollToTop(200);
  //  this.custome.model="";
  //   this.custome.color="";
  //   this.custome.pincode="";
  //this.barChart.update(0);
  this.barChart.destroy();
   this.postList=[];
      this.postListone=[];
      this.postListtwo=[];
      this.postListthree=[];
      this.postListfour=[];
      this.postListsix=[];
      this.postListseven=[];
  }
  // getEnqReport(){
   
  //   //let sdate = this.datePipe.transform(new Date(this.custome.start_date), 'yyyy-MM-dd');
  //   // /let edate= this.datePipe.transform(new Date(this.custome.end_date), 'yyyy-MM-dd');
  //   this.restProvider.getSales(this.custome.aid,this.custome.start_date,this.custome.end_date,this.custome.model,this.custome.color,this.custome.pincode)
  //   .then(data => {
  //     this.postList=[];
  //     this.postListone=[];
  //     this.postListtwo=[];
  //     this.postListthree=[];
  //    this.postList = data["report"];
  //    this.postListone = data["models"];
  //    this.postListtwo = data["colors"];
  //    this.postListthree = data["pincode"];

  //    for(let i=0;i<data["models"].length;i++){
  //     this.sample.push(data["models"][i]["modelname"]);
  //     this.sampleOne.push(data["models"][i]["count"]);
  //     }
  //     this.ionViewDidLoad(this.sample, this.sampleOne);

     
  //   });

  // }

  getEnqReport(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
   
    //let sdate = this.datePipe.transform(new Date(this.custome.start_date), 'yyyy-MM-dd');
    // /let edate= this.datePipe.transform(new Date(this.custome.end_date), 'yyyy-MM-dd');
    this.restProvider.getSales(this.custome.aid,this.custome.start_date,this.custome.end_date,0,30,this.custome.pincode)
    .then(data => {
      this.postList=[];
      this.postListone=[];
      this.postListtwo=[];
      this.postListthree=[];
      this.postListfour=[];
      this.postListsix=[];
      this.postListseven=[];
     this.postList = data["report"];
     this.postListone = data["models"];
     this.postListtwo = data["colors"];
     this.postListthree = data["pincode"];
     this.postListfour=data["teflon"];
     this.postListsix=data["net_amt"];
     this.postListseven=data["extended_warrenty"];
     this.total=data["granttotal"];
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

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if(this.postList){
    setTimeout(() => {
     // this.postList =[];
        this.restProvider.getSales(this.custome.aid,this.custome.start_date,this.custome.end_date, 0, this.sampledata+30,this.custome.pincode)
        .then(data => {
         this.postList = data["report"];
        });
      

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);

    this.sampledata=this.sampledata+30;
  }
    
  }

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
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
    //             label: "Report",
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
