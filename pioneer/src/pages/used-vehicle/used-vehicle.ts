import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { Base64 } from '@ionic-native/base64';

/**
 * Generated class for the UsedVehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-used-vehicle',
  templateUrl: 'used-vehicle.html',
})
export class UsedVehiclePage {
  checkedItems =[];

  lead = { modelname: '', kmsRunned: '',year: '',price:'',aid:'',bid:'' };
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
      storage.get('aid').then((val) => {
        this.lead.aid=val;
            });
            storage.get('bid').then((vals) => {
              this.lead.bid=vals;
                  });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsedVehiclePage');
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



  

  uploadFile(){

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
      params : {
    'modelname':this.lead.modelname,
    'kmsRunned':this.lead.kmsRunned,
  'year':this.lead.year,
'price':this.lead.price,
'aid':this.lead.aid,
'bid':this.lead.bid}
    }
    //'https://itmspl.com/pioneer/send_offer.php?eids='+eid+'&&title='+this.lead.title+'&&description='+this.lead.title
  
    fileTransfer.upload(this.fileURI, 'https://itmspl.com/pioneer/post_used_cars.php', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      let datafy =JSON.parse(data.response);
     // this.imageFileName = this.imageURI;
      loader.dismiss();
      this.presentToast(  this.imageURI+""+datafy["message"]);
      this.imageURI="";
      this.base64Image="";
      this.lead.kmsRunned="";
      this.lead.modelname="";
      this.lead.year="";
      this.lead.price="";

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
