import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';

/**
 * Generated class for the AddReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-report',
  templateUrl: 'add-report.html',
})
export class AddReportPage {
  filepath :any;
  imageURI:any;
  imageFileName:any;
  nativepath: string;
  file;

  constructor(public navCtrl: NavController, public navParams: NavParams,private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,private fileChooser: FileChooser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReportPage');
  }

  filechooser() {




    this.fileChooser.open()
    .then(uri => {
      (<any>window).FilePath.resolveNativePath(uri, (result) => {
        this.nativepath = result;
        alert(this.nativepath);
         let path = this.nativepath.substring(0, this.nativepath.lastIndexOf('/'));
       //  alert(path);
         this.imageURI = this.nativepath ;
        })
    .catch(e => console.log(e));
      })}

  /*  FileChooser.open()
  .then(uri => { alert(JSON.stringify(uri));
    (<any>window).FilePath.resolveNativePath(uri, (result) => {
      this.nativepath = result;
      alert(this.nativepath);
       let path = this.nativepath.substring(0, this.nativepath.lastIndexOf('/'));
       alert(path);
      //readAsDataURL
      //readAsBinaryString
      //File.readAsText(path, "abc.pdf")

      File.readAsBinaryString(path, "abc.pdf")
      .then(content=>{
        content = (<any>window).btoa(content);
        console.log(content);
        alert(JSON.stringify(content));
      })
      .catch(err=>{
        console.log(err);
        alert(JSON.stringify(err));
      });


      //this.audioplay();
    }, (err) => {
      alert(err);
    })
   
  })
  .catch(e => console.log(e));
  }*/

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.218.2/upload.php', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
     // this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
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
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
}
