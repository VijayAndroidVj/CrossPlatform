import { Component ,ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  doughnutChart: any;
  postList = [{title:"test1"},{title:"test2"},{title:"test3"},{title:"test4"},{title:"test5"}];
  users: any;
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  
     barChart: any;

     constructor(public navCtrl: NavController,public restProvider: RestProvider) {
     
    }
   
    ionViewDidLoad() {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        
                   type: 'doughnut',
                   data: {
                       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                       datasets: [{
                           label: '# of Votes',
                           data: [12, 1, 3, 5, 2, 3],
                           backgroundColor: [
                               'rgba(255, 99, 132, 0.2)',
                               'rgba(54, 162, 235, 0.2)',
                               'rgba(255, 206, 86, 0.2)',
                               'rgba(75, 192, 192, 0.2)',
                               'rgba(153, 102, 255, 0.2)',
                               'rgba(255, 159, 64, 0.2)'
                           ],
                           hoverBackgroundColor: [
                               "#FF6384",
                               "#36A2EB",
                               "#FFCE56",
                               "#FF6384",
                               "#36A2EB",
                               "#FFCE56"
                           ]
                       }]
                   }
        
               }); 
    }

}
