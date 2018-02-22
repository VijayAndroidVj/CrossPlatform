import { Component } from '@angular/core';
import { IonicPage,NavController, LoadingController, ToastController,Nav } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ServiceReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-report',
  templateUrl: 'service-report.html',
})
export class ServiceReportPage {
  filepaths :any;
  imageURIs:any;
  fileURIs:any;
  imageFileNames:any;
  nativepaths: string;
  custome = {sid:"",bid:"",eid:"",aid:"",start_date:"",end_date:""}
  file;
  postList:any;
 

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,public nav:Nav,public storage: Storage,private fileChooser: FileChooser,public restProvider: RestProvider) {
      storage.get('aid').then((val) => {
        console.log('Your age is', val);
        this.custome.aid=val;
            });
            storage.get('eid').then((val) => {
              this.custome.eid=val;
                  });

                  storage.get('sid').then((sid) => {
      
                    if(sid){
                      this.custome.sid=sid;
        
                      storage.get('bid').then((bid) => {
              
                        if(bid){
                          this.custome.bid=bid;
                      
                          storage.get('aid').then((aid) => {
                            if(aid){
                              this.custome.aid=aid;  
                              storage.get('eid').then((eid) => {
                                this.custome.eid=eid;
                              });

                            }
                          });
                        }       
                            });
                    } 
                        });           
  }
  ngOnInit() {
   // this.custome.start_date = this.datePipe.transform(new Date(), 'dd/MM/yy');
     // this.custome.end_date = this.datePipe.transform(new Date(), 'dd/MM/yy');
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceReportPage');
  }

  getserviceReport(){
    this.fileChooser.open()
    .then(uri => {
      this.fileURIs=uri;
      (<any>window).FilePath.resolveNativePath(uri, (result) => {
        this.nativepaths = result;
        alert(this.nativepaths);
         let path = this.nativepaths.substring(this.nativepaths.lastIndexOf(('/'))+1);
         //path.substring(path.lastIndexOf("/")+1);
       //  alert(path);
         this.imageURIs =path ;
        })
    .catch(e => console.log(e));


      console.log(uri)})
    .catch(e => console.log(e));
  }

  // getImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   }
  
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.imageURIs = imageData;
  //   }, (err) => {
  //     console.log(err);
  //     this.presentToast(err);
  //   });
  // }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName:  this.imageURIs,
      chunkedMode: false,
     // mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.fileURIs, 'http://www.itmspl.com/pioneer/service.php?eid='+this.custome.eid+'&&aid='+this.custome.aid+'&&bid='+this.custome.bid+'&&sid='+this.custome.sid, options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      let datafy =JSON.parse(data.response);
     // this.imageFileName = this.imageURI;
      loader.dismiss();
      this.presentToast(  this.imageURIs+datafy["message"]);
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
