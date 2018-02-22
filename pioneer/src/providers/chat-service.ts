import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number|string ;
    message: string;
    status: string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

@Injectable()
export class ChatService {

    constructor(public http: HttpClient,public events: Events) {
        this.http = http;
                   
    }

    mockNewMsg(msg) {
        const mockMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'Hancock',
            userAvatar: '',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.message,
            status: 'success'

        };

        setTimeout(() => {
            this.events.publish('chat:received', mockMsg, Date.now())
        }, Math.random() * 1800)
    }

    getMsgList(data,data1): Promise<ChatMessage[]> {
        return  this.http.get("http://www.itmspl.com/pioneer/get_chat.php?mobile="+data+"&&toid="+data1)
        .toPromise()
        .then(response => response["products"] as ChatMessage[])
        .catch(err => Promise.reject(err || 'err'));
    }

    sendMsg(msg: ChatMessage) {

        let body = JSON.stringify(msg)
    //    / headers = new Headers({'Content-Type': 'application/json'});
       // options = new RequestOptions({headers: headers});
    return this.http.post('http://www.itmspl.com/pioneer/chat.php', body).toPromise();

/*
        return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
        .then(() => this.mockNewMsg(msg));*/
    }

    getUserInfo(): Promise<UserInfo> {
        const userInfo: UserInfo = {
            id: '140000198202211138',
            name: 'Luff',
            avatar: './assets/profile.png'
        };
        return new Promise(resolve => resolve(userInfo));
    }

}