import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,storage: Storage,public events: Events, public chatService: ChatService) {
    storage.get('mobile').then((val) => {
        storage.get('name').then((valOne) => {
            this.user= {
                id: val,
                name:valOne
            };
      
          });
    });
      this.toUser = {
        id: navParams.get('toUserId'),
        name: navParams.get('toUserName')
    };
    // Get mock user information
   
       
   
      
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
}

ionViewDidEnter() {
    //get message list
    this.getMsg()
    .then(() => {
        this.scrollToBottom();
    });

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
        this.pushNewMsg(msg);
    })
}

onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
}

switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
        this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();
}

/**
 * @name getMsg
 * @returns {Promise<ChatMessage[]>}
 */
getMsg() {
    // Get mock message list
    return this.chatService
    .getMsgList(this.user.id,this.toUser.id)
    .then(res => {
        this.msgList = res;
    })
    .catch(err => {
        console.log(err)
    })
}

/**
 * @name sendMsg
 */
sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
        messageId: Date.now().toString(),
        userId: this.user.id,
        userName: this.user.name,
        userAvatar: "./assets/profile.png",
        toUserId: this.toUser.id,
        time: Date.now(),
        message: this.editorMsg,
        status: '0'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
        this.messageInput.setFocus();
    }

    this.chatService.sendMsg(newMsg)
    .then(() => {
        let index = this.getMsgIndexById(id);
        if (index !== -1) {
            this.msgList[index].status = 'success';
        }
    })
}

/**
 * @name pushNewMsg
 * @param msg
 */
pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
          toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
        this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
        this.msgList.push(msg);
    }
    this.scrollToBottom();
}

getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
}

scrollToBottom() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
}
}

