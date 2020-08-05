import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-weather',
    templateUrl: './weather.page.html',
    styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
    currentWeather: any;
    data: any = [];
    forecastArray: any = [];
    lon: any;
    lat: any;
    currentCoords: any;
    url: string;
    today = Date.now();

    constructor(private weather: WeatherService,
        private http: HttpClient,
        private geolocation: Geolocation) { }

        ngOnInit(): void {
            this.loadLocalWeather();
        }

        async loadLocalWeather() {
            await  this.geolocation.getCurrentPosition().then((resp) => {
                this.lat = resp.coords.latitude;
                this.lon = resp.coords.longitude;
                this.currentCoords = ("&lat=" + resp.coords.latitude +
                "&lon=" + resp.coords.longitude);
                console.log(this.currentCoords);

                this.url = ("http://api.openweathermap.org/data/2.5/weather?" +
                this.currentCoords +
                "&units=metric&id=524901&APPID=b18deed2ca4ede1ae8f79f76f887fa11");
                console.log(this.url);

                this.http.get(this.url).subscribe(response => {
                    this.currentWeather = response;
                    console.log(this.currentWeather);
                    this.loadLocalForecast();
                });

            });
        }


        loadLocalForecast() {
            const forecastURL = ("http://api.openweathermap.org/data/2.5/forecast?" +
            this.currentCoords +
            "&units=metric&id=524901&APPID=b18deed2ca4ede1ae8f79f76f887fa11");
            console.log(forecastURL);

            this.http.get(forecastURL).subscribe(weather => {
                this.data = weather['list'];
                for (let item of this.data){
                    if (item.dt_txt.split(' ').pop().slice(0,2) ==12) this.forecastArray.push(item);
                }
            });
        }
    }
