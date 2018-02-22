import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ChatRoomPage } from '../chat-room/chat-room';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  postList :any;
  toUser:any;
  notifications: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public nav:Nav,public storage: Storage,public restProvider: RestProvider) {
    
    storage.get('mobile').then((val) => {
      console.log('Your age is', val);

      storage.get('sid').then((sid) => {
        console.log('Your age is', val);
      //  this.getLed(val);
        storage.get('aid').then((aid) => {
          console.log('Your age is', val);
          this.getLed(val,sid,aid);
        });
      });

      
      //this.getLed(val);
    });


    /*
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      data: { mydata: 'My hidden message this is' }
    }); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  getLed(id,sid,aid) {
    this.restProvider.getChatLeads(id,sid,aid)
    .then(data => {
     this.postList = data;
      console.log(this.postList);
     
    });
  } 

  openChat(one,two){
    this.toUser = {
      toUserId:one,
      toUserName:two
    }
    this.navCtrl.push(ChatRoomPage,this.toUser)
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
