import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'news', loadChildren: './news/news/news.module#NewsPageModule' },
  { path: 'weather', loadChildren: './weather/weather/weather.module#WeatherPageModule' },
  { path: 'modal', loadChildren: './home/modal/modal.module#ModalPageModule' },
  { path: 'emergency', loadChildren: './emergency/emergency.module#EmergencyPageModule' },
  { path: 'contacts', loadChildren: './emergency/contacts/contacts.module#ContactsPageModule' },
  { path: 'information', loadChildren: './emergency/information/information.module#InformationPageModule' },
  { path: 'buses', loadChildren: './transport/buses/buses.module#BusesPageModule' },
  { path: 'bus-details', loadChildren: './transport/buses/bus-details/bus-details.module#BusDetailsPageModule' },
  { path: 'journey', loadChildren: './transport/journey/journey.module#JourneyPageModule' },
  { path: 'journey-details', loadChildren: './transport/journey/journey-details/journey-details.module#JourneyDetailsPageModule' },
  { path: 'new-user', loadChildren: './new-user/new-user.module#NewUserPageModule' },
  { path: 'choices', loadChildren: './new-user/choices/choices.module#ChoicesPageModule' },
  { path: 'transport-tabs', loadChildren: './transport/transport-tabs/transport-tabs.module#TransportTabsPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
