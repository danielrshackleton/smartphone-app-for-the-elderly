import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransportTabsPage } from './transport-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TransportTabsPage,
    children:[
        { path: 'journey', loadChildren: '../journey/journey.module#JourneyPageModule'},
        { path: 'buses', loadChildren: '../buses/buses.module#BusesPageModule'},
    ]
    },
    {
    path:'',
    redirectTo:'/transport-tabs/journey',
    pathMatch:'full'
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransportTabsPage]
})
export class TransportTabsPageModule {}
