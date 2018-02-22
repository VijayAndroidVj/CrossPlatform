import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';



import {FCM, NotificationData} from "@ionic-native/fcm";
import { Storage } from '@ionic/storage';
//import { MenuPage } from '../pages/menu/menu';
//import { MenusPage } from '../pages/menus/menus';
//import { MenuonePage } from '../pages/menuone/menuone';
import { App } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ScreenPage } from '../pages/screen/screen';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =ScreenPage;
  lastBack;
  allowClose : boolean;
  navigate;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private app:App,
    public http: HttpClient,
    public toastCtrl: ToastController,
    private fcm:FCM,private storage: Storage) {
    
      storage.get('status').then((val) => {
        if(val == "1"){ 
          this.navigate="DashboardPage" ;
         // this.rootPage =MenuPage ;
        }else if(val == "2"){
          this.navigate="AdminDashboardPage";
         // this.rootPage =MenusPage ;
        }else if(val == "3"){
          this.navigate="UserdashboardPage";
          //this.rootPage =MenuonePage ;
          // storage.get('designation').then((vals) => {
          //   if(vals == "Sales Admin"){
             
          //    }else if(vals == "Sales Staff"){
          //     this.rootPage =MenutwoPage ;  
          //    }else if(vals == "Services Admin"){
          //     this.rootPage =MenuthreePage
          //    }else if(vals== "Services Staff"){
          //     this.rootPage =MenufourPage
          //    }
          // });
  
        }else{
          this.rootPage =LoginPage;
        }
  
      
            });
  
  
            // if(data["eid"] != 0){
            //   console.log(data["eid"]);
            //            var dae='https://itmspl.com/pioneer/register_fcm.php?eid='+data["eid"]+'&&aid='+data["aid"]+'&&fcm_token='+this.fcm;
            //            this.http.get(dae)
            //            .subscribe(data => {
            //             alert(data["message"]);
            //              //this.newData=data["success"];
            //            }, error => {
            //                console.log("Oooops!");
            //            });
            
            //           }
  
            this.initializeApp();
  }

  initializeApp() {

    this.platform.registerBackButtonAction(() => {
      const overlay = this.app._appRoot._overlayPortal.getActive();
      const nav = this.app.getActiveNav();
      const closeDelay = 2000;
      const spamDelay = 500;

      
    
      if(overlay && overlay.dismiss) {
        overlay.dismiss();
      }else if(nav.canGoBack()){
        nav.pop();
     // nav.setRoot(DashboardPage);
      }else if(nav.getActive().name !=this.navigate){
        nav.setRoot(this.navigate);
       
      }  else if(Date.now() - this.lastBack > spamDelay && !this.allowClose) {
        this.allowClose = true;
        let toast = this.toastCtrl.create({
          message: "Are you sure to exit app",
          duration: closeDelay,
          dismissOnPageChange: true
        });
        toast.onDidDismiss(() => {
          this.allowClose = false;
        });
        toast.present();
      } else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
        this.platform.exitApp();
      }
      this.lastBack = Date.now();
    });




    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#56CA96')

      //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
      //y procesar las notificaciones
      this.fcm.getToken()
        .then((token:string)=>{
          this.storage.set('token', token);
          //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder enviar mensajes
          // a esta  aplicación
          //o también copiar el token para usarlo con Postman :D
          console.log("The token to use is: "+token,token);
          this.storage.set('token', token);
          
          //alert(token);

        })
        .catch(error=>{
          //ocurrió un error al procesar el token
          console.error(error);
        });

      /**
       * No suscribimos para obtener el nuevo token cuando se realice un refresh y poder seguir procesando las notificaciones
       * */
      this.fcm.onTokenRefresh().subscribe(
        (token:string)=>{
          this.storage.set('token', token);
          console.log("Nuevo token",token)
        },
        error=>console.error(error)
      );

      /**
       * cuando la configuración este lista, vamos a procesar los mensajes
       * */
      this.fcm.onNotification().subscribe(
        (data:NotificationData)=>{
          if(data.wasTapped){
            //alert(JSON.stringify(data));
            //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se muestra en el dispositivo
            console.log("Received in background",JSON.stringify(data))
          }else{
            //alert(JSON.stringify(data));
            //ocurre cuando nuestra aplicación se encuentra en primer plano,
            //puedes mostrar una alerta o un modal con los datos del mensaje
            console.log("Received in foreground",JSON.stringify(data))
          }
         },error=>{
          console.error("Error in notification",error)
         }
      );

    });
  }
}

