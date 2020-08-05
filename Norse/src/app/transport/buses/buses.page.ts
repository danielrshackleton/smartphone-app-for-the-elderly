import { Component, OnInit } from '@angular/core';
import { TransportService } from '../services/transport.service';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-buses',
    templateUrl: './buses.page.html',
    styleUrls: ['./buses.page.scss'],
})
export class BusesPage implements OnInit {
    private buses: any;
    private currentLocation: any;

    constructor(
        private router: Router,
        private transport: TransportService,
        private http: HttpClient) {

        }


        async loadBuses(){
            this.currentLocation = await this.transport.getCurrentLocation();

            const url = ('http://transportapi.com/v3/uk/places.json?' +
            this.currentLocation + '&type=bus_stop' + this.transport.getAppDetails());
            // Get the ten closest bus stops to current position
            this.http.get(url).subscribe(local => {
                this.buses = local['member'];
                console.log(this.buses);
            })
        }


        getBusDetails(bus){
            this.router.navigate(['/bus-details', { 'name': bus.name,
            'description': bus.description, 'code': bus.atcocode}]);
        }

        ngOnInit() {
            this.loadBuses();
        }



    }
