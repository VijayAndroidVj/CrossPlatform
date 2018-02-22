import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { FileTransfer} from '@ionic-native/file-transfer';
import { IonicStorageModule } from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { Base64 } from '@ionic-native/base64';
import { FCM } from '@ionic-native/fcm';

import { EmojiProvider } from '../providers/emoji';
import { ChatService } from '../providers/chat-service';

import { MenuPageModule } from '../pages/menu/menu.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { AddReportPageModule } from '../pages/add-report/add-report.module';
import { ServiceReportPageModule } from '../pages/service-report/service-report.module';
import { StockReportPageModule } from '../pages/stock-report/stock-report.module';
import { UserdashboardPageModule } from '../pages/userdashboard/userdashboard.module';
import { MenusPageModule } from '../pages/menus/menus.module';
import { MenuonePageModule } from '../pages/menuone/menuone.module';
import { AdminPageModule } from '../pages/admin/admin.module';
import { SalesPageModule } from '../pages/sales/sales.module';
import { ServicesPageModule } from '../pages/services/services.module';
import { StockPageModule } from '../pages/stock/stock.module';
import { AdminDashboardPageModule } from '../pages/admin-dashboard/admin-dashboard.module';
import { OfferPageModule } from '../pages/offer/offer.module';
import { SparepartsPageModule } from '../pages/spareparts/spareparts.module';
import { TargetPageModule } from '../pages/target/target.module';
import { UsedVehiclePageModule } from '../pages/used-vehicle/used-vehicle.module';
import { OfferDetailsPageModule } from '../pages/offer-details/offer-details.module';
import { FeedbackPageModule } from '../pages/feedback/feedback.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LeadDetailsPageModule } from '../pages/lead-details/lead-details.module';
import { AddBranchPageModule } from '../pages/add-branch/add-branch.module';
import { AdminDetailsPageModule } from '../pages/admin-details/admin-details.module';
import { BranchDetailsPageModule } from '../pages/branch-details/branch-details.module';
import { ChatRoomPageModule } from '../pages/chat-room/chat-room.module';
import { AddAdminPageModule } from '../pages/add-admin/add-admin.module';
import { ViewTaskPageModule } from '../pages/view-task/view-task.module';
import { AddEventPageModule } from '../pages/add-event/add-event.module';
import { AddLeadPageModule } from '../pages/add-lead/add-lead.module';
import { ScreenPageModule } from '../pages/screen/screen.module';
import { CustomerServicePageModule } from '../pages/customer-service/customer-service.module';
import { TestDrivePageModule } from '../pages/test-drive/test-drive.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    ScreenPageModule,
LeadDetailsPageModule,
AddBranchPageModule,
AdminDetailsPageModule,
BranchDetailsPageModule,
ChatRoomPageModule,
AddAdminPageModule,
ViewTaskPageModule,
AddEventPageModule,
AddLeadPageModule,
    HttpClientModule,
    MenuPageModule,
    MenusPageModule,
    MenuonePageModule,
    DashboardPageModule,
    OfferPageModule,
    AdminDashboardPageModule,
    SalesPageModule,
    FeedbackPageModule,
    SparepartsPageModule,
    UsedVehiclePageModule,
    ServicesPageModule,
    CustomerServicePageModule,
    TestDrivePageModule,
    StockPageModule,
    TargetPageModule,
    AddReportPageModule,
    OfferDetailsPageModule,
    UserdashboardPageModule,
    StockReportPageModule,
    AdminPageModule,
    ServiceReportPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    FileTransfer,
    FileChooser,
    Base64,
    EmojiProvider,
    ChatService

  ]
})
export class AppModule {}
