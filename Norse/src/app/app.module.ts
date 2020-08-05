import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ModalPageModule } from './home/modal/modal.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';

import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot({
          mode: 'ios'
      }),
      HttpClientModule,
      AppRoutingModule,
      IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage','sqlite', 'websql','indexeddb']
    }),
      ModalPageModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    Geolocation,
    DatePipe,
    AppLauncher,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
