import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Nav} from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { ToastController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { Base64 } from '@ionic-native/base64';
/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
  
})
export class OfferPage {
  checkedItems =[];
  lead = { title: '', description: '',eids: "" };
  items:any;
  filepath :any;
  imageURI:any;
  fileURI:any;
  imageFileName:any;
  nativepath: string;
  custome = {sid:"",bid:"",eid:"",aid:"",start_date:"",end_date:""}
  file;
  postList:any;
  base64Image:any;

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private fileChooser: FileChooser,
    private base64: Base64,
    public loadingCtrl: LoadingController,public nav:Nav,public storage: Storage,public navParams: NavParams,public restProvider: RestProvider,public toastCtrl: ToastController) {
    this.items = [{id:0, name:'All'},
    {id:1, name:'chan'},
    {id:2, name:'viswa'}];
  this.checkedItems = new Array(this.items.length);

  this.getLead();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }
  //https://itmspl.com/pioneer/send_offer.php?eids=6,7&&title=chan&&description=124
  // addOfferServer(){
  //   this.restProvider.addNotification(this.lead.aid,this.lead.title,this.lead.description).then((result) => {
  //     console.log(result);
  //     if(result["result"] == "success"){
  //       let toast = this.toastCtrl.create({
  //         message: result["message"],
  //         duration: 3000
  //       });
  //        toast.present();
  //     }else{        
  //       let toast = this.toastCtrl.create({
  //         message: result["message"],
  //         duration: 3000
  //       });
  //        toast.present();
  //     }
  //   }, (err) => {
  //     console.log(err);
  //     let toast = this.toastCtrl.create({
  //       message:err,
  //       duration: 3000
  //     });
  //      toast.present();
  //   });


  //  }

  getLead(){
    this.restProvider.getOfferLead()
    .then(data => {
     this.postList = data;
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


   getFile(){
    this.fileChooser.open()
    .then(uri => {
      this.fileURI=uri;
      (<any>window).FilePath.resolveNativePath(uri, (result) => {
        this.nativepath = result;
       
        
       // this.base64Image = 'data:image/jpeg;base64,'+result;
         let path = this.nativepath.substring(this.nativepath.lastIndexOf(('/'))+1);
         //path.substring(path.lastIndexOf("/")+1);
       //  alert(path);
         this.imageURI =path ;
         let filePath: string = result;
         this.base64.encodeFile(filePath).then((base64File) => {
          var realData = base64File.split(",")[1];
          
                let newNewStr = realData.replace( new RegExp("\n", 'g'),"").replace(new RegExp("\r",'g'), "");
     
                 console.log(newNewStr);
                this.base64Image = 'data:image/jpeg;base64,'+newNewStr;
             // this.base64Image=base64File;
         }, (err) => {
           console.log(err);
         });

        })
    .catch(e => console.log(e));


      console.log(uri)})
    .catch(e => console.log(e));
  }

   


  // getImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //     destinationType: this.camera.DestinationType.DATA_URL
  //   }
  
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.imageURI = imageData;
  //     this.base64Image = 'data:image/jpeg;base64,'+imageData;
  //     (<any>window).FilePath.resolveNativePath(imageData, (result) => {
  //       this.nativepath = result;
  //     })
  //     .catch(e => console.log(e));
  //   }, (err) => {
  //     console.log(err);
  //     this.presentToast(err);
  //   });
  // }

  test(){
    let eid="0";
    for(let i=0 ;i<this.checkedItems.length;i++){
      if(this.checkedItems[i]==true){
        eid=eid+","+i;
      }
      
    }
    console.log(this.checkedItems);
  }


  

  uploadFile(){
let eid="0";
for(let i=0 ;i<this.checkedItems.length;i++){
  if(this.checkedItems[i]==true){
    eid=eid+","+i;
  }
  
}
console.log(this.checkedItems);
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    if(this.imageURI){}
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName:  this.imageURI,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {},
      params : {'eids': eid,
    'title':this.lead.title,
    'description':this.lead.description}
    }
    //'https://itmspl.com/pioneer/send_offer.php?eids='+eid+'&&title='+this.lead.title+'&&description='+this.lead.title
  
    fileTransfer.upload(this.fileURI, 'https://itmspl.com/pioneer/send_offer.php', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      let datafy =JSON.parse(data.response);
     // this.imageFileName = this.imageURI;
      loader.dismiss();
      this.presentToast(  this.imageURI+datafy["message"]);
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }






}
