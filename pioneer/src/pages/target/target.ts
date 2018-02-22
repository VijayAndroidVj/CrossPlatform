import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { AddEventPage } from '../add-event/add-event';
import { ViewTaskPage } from '../view-task/view-task';



/**
 * Generated class for the TargetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-target',
  templateUrl: 'target.html',
})
export class TargetPage {
  date= new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  postList = [{title:"test1"},{title:"test2"},{title:"test3"},{title:"test4"},{title:"test5"}];
  users: any;
  confirm :any;
  possitive :any;
  negative : any;
  installed : any;
  notify:any;

  eventList: any;
  selectedEvent: any;
  isSelected: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,public nav:Nav, public storage: Storage) {
    storage.get('aid').then((val) => {
   
      storage.get('eid').then((eid) => {
        
if(eid == "0"){
  this.gettasks(val);
}else{
this.gettasksId(eid,val);
}
     
    });
    });

      this.monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TargetPage');
    //this.getDaysOfMonth();
  }


  gettasks(val) {
    this.restProvider.getTask(val)
    .then(data => {

      //this.eventList = new Array();

      this.eventList = data;

      this.getDaysOfMonth();

     // this.loadEventThisMonth();

    
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

  opentaskDetails(broker){
    this.navCtrl.push(ViewTaskPage,broker);
}


  
  gettasksId(val,id) {
    this.restProvider.getTaskId(val,id)
    .then(data => {

      //this.eventList = new Array();

    this.eventList = data;

      this.getDaysOfMonth();

     // this.loadEventThisMonth();

    
    });
  } 




addEvent() {
  this.navCtrl.push(AddEventPage);
}

// deleteEvent(evt) {
//   // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
//   // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
//   let alert = this.alertCtrl.create({
//     title: 'Confirm Delete',
//     message: 'Are you sure want to delete this event?',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Ok',
//         handler: () => {
//           this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
//             (msg) => {
//               console.log(msg);
//               this.loadEventThisMonth();
//               this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
//             },
//             (err) => {
//               console.log(err);
//             }
//           )
//         }
//       }
//     ]
//   });
//   alert.present();
// }

selectDate(day) {
  this.isSelected = false;
  this.selectedEvent = new Array();
  let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
  let thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
  this.eventList.forEach(event => {
    if(((event.start_date >= thisDate1) && (event.start_date <= thisDate2)) ) {
      this.isSelected = true;
      this.selectedEvent.push(event);
    }
  });
}


getDaysOfMonth() {
  this.daysInThisMonth = new Array();
  this.daysInLastMonth = new Array();
  this.daysInNextMonth = new Array();
  this.currentMonth = this.monthNames[this.date.getMonth()];
  this.currentYear = this.date.getFullYear();
  if(this.date.getMonth() === new Date().getMonth()) {
    this.currentDate = new Date().getDate();
  } else {
    this.currentDate = 999;
  }

  let firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  let prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
  for(let i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
    this.daysInLastMonth.push(i);
  }

  let thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
  for (let i = 0; i < thisNumOfDays; i++) {
    this.daysInThisMonth.push(i+1);
  }

  let lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
  //let nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
  for (let i = 0; i < (6-lastDayThisMonth); i++) {
    this.daysInNextMonth.push(i+1);
  }
  let totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
  if(totalDays<36) {
    for(let i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
      this.daysInNextMonth.push(i);
    }
  }
}

goToLastMonth() {
  this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
  this.getDaysOfMonth();
}

goToNextMonth() {
  this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
  this.getDaysOfMonth();
}

// loadEventThisMonth() {
//   this.eventList = new Array();
//   let startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
//   let endDate = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);

  
//   this.calendar.listEventsInRange(startDate, endDate).then(
//     (msg) => {
//       msg.forEach(item => {
//         this.eventList.push(item);
//       });
//     },
//     (err) => {
//       console.log(err);
//     }
//   );
// }


checkEvent(day) {
  let hasEvent = false;
  let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
  let thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
  this.eventList.forEach(event => {
    if(((event.start_date >= thisDate1) && (event.start_date <= thisDate2))) {
      hasEvent = true;
    }
  });
  return hasEvent;
}

  

}
