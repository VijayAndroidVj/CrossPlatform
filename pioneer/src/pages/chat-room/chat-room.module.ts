import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatRoomPage } from './chat-room';
import {ChatService} from "../../providers/chat-service";
import {RelativeTime} from "../../pipes/relative-time";
import {EmojiPickerComponentModule} from "../../components/emoji-picker/emoji-picker.module";
import {EmojiProvider} from "../../providers/emoji";

@NgModule({
  declarations: [
    ChatRoomPage,
    RelativeTime
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(ChatRoomPage),
  ],
  exports: [
    ChatRoomPage
  ],
  providers:[
    ChatService,
    EmojiProvider
  ]
})
export class ChatRoomPageModule {}
