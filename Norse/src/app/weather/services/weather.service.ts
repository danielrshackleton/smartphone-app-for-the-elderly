import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    private lat: any;
    private lon: any;
    private currentCoords: any;

  constructor(
      private http: HttpClient,
  private geolocation: Geolocation,
) { }

getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        this.currentCoords = ("&lat=" + resp.coords.latitude +
    "&lon=" + resp.coords.longitude);
}).catch((error) => {
    console.log('Error getting location', error);
});
    return this.currentCoords;
}


  getLocalForecast(){

  }

  getForecast() {
    // const url = this.baseUrl + 'top-headlines?' + this.country + this.apiKey;
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=Norwich,GB&units=metric&id=524901&APPID=b18deed2ca4ede1ae8f79f76f887fa11');
  }

  getWeather() {
    // const url = this.baseUrl + 'top-headlines?' + this.country + this.apiKey;
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Norwich,GB&units=metric&id=524901&APPID=b18deed2ca4ede1ae8f79f76f887fa11');
  }
}
