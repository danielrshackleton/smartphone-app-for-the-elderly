import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TransportService {
    private currentLocation: any;
    private appID = '&app_id=300897bd';
    private appKey = '&app_key=20e5f60f9386eb631b529081dec189bd'
    private lat: any;
    private lon: any;

    constructor(
        private geolocation: Geolocation,
        private http: HttpClient
    ) {


        // let watch = this.geolocation.watchPosition();
        // watch.subscribe((data) => {
        //     // data can be a set of coordinates, or an error (if an error occurred).
        //     // data.coords.latitude
        //     // data.coords.longitude
        // });

    }
    // getLocation(){
    //     this.geolocation.getCurrentPosition().then((resp) => {
    //         this.lat = resp.coords.latitude;
    //         this.lon = resp.coords.longitude;
    //         this.currentLocation = ("&lat=" + resp.coords.latitude +
    //     "&lon=" + resp.coords.longitude);
    // }).catch((error) => {
    //     console.log('Error getting location', error);
    // });
    // }

    async getCurrentLocation(){
        await this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;
            this.currentLocation = ("&lat=" + resp.coords.latitude +
        "&lon=" + resp.coords.longitude);
    }).catch((error) => {
        console.log('Error getting location', error);
    });
        return this.currentLocation;
    }

    async getCurrentJourneyCoords(){
        await this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;
            this.currentLocation = ("lonlat:" + resp.coords.longitude +
        "," + resp.coords.latitude);
    }).catch((error) => {
        console.log('Error getting location', error);
    });
        return this.currentLocation;
    }

    async getLatitude(){
        await this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
    }).catch((error) => {
        console.log('Error getting location', error);
    });
        return this.lat;
    }

    async getLongitude(){
        await this.geolocation.getCurrentPosition().then((resp) => {
            this.lon = resp.coords.longitude;
    }).catch((error) => {
        console.log('Error getting location', error);
    });
        return this.lon;
    }

    getAppDetails(){
        return (this.appID + this.appKey);
    }

    // getLocalBuses(){
    //     const url = 'http://transportapi.com/v3/uk/places.json?' +
    //     '&lat=' + this.lat + '&lon=' + this.lon
    //     + 'app_id=' + this.appID + '&app_key=' + this.appKey;
    //
    //     return this.http.get(url);
    // }


}
