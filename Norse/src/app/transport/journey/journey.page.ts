import { Component, OnInit, Input  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransportService } from '../services/transport.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-journey',
    templateUrl: './journey.page.html',
    styleUrls: ['./journey.page.scss'],
})
export class JourneyPage implements OnInit {
    inputDisabled: boolean = false;
    startPlaceholder: string = "";
    isCurrentLocation: boolean = false;
    @Input() startInput: any;
    @Input() endInput: any;
    startInfo: any;
    endInfo: any;
    startCoords: any;
    endCoords: any;
    queryUrl: any;
    today = new Date();
    tomorrow = new Date(new Date().setDate(this.today.getDate()+1));
    twoDays = new Date(new Date().setDate(this.today.getDate()+2));
    threeDays = new Date(new Date().setDate(this.today.getDate()+3));
    fourDays =new Date(new Date().setDate(this.today.getDate()+4));
    fiveDays = new Date(new Date().setDate(this.today.getDate()+5));
    sixDays = new Date(new Date().setDate(this.today.getDate()+6));
    sevenDays = new Date(new Date().setDate(this.today.getDate()+7));
    departureTime = new Date().toLocaleTimeString();
    departureDay= new Date();


    constructor(
        private transport: TransportService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter(){
        this.clearInputs();
    }


    async fromCurrent(){
        this.inputDisabled = true;
        this.startInput = "Current Location";
        this.startCoords = await this.transport.getCurrentJourneyCoords();
        console.log(this.startCoords);
        this.isCurrentLocation = true;
        console.log(this.startInput);
    }



    clearFirstInput(){
        this.startInput = "";
        this.isCurrentLocation = false;
    }

    clearInputs(){
        this.startInput = "";
        this.endInput = "";
        this.isCurrentLocation = false;
    }

    getStartCoords(){


        const startUrl = "https://transportapi.com/v3/uk/places.json?"
        + this.transport.getAppDetails() + "&query=" + this.startInput;

        return this.http.get(startUrl)
        .toPromise()
        .then(location => {
            this.startInfo = location;
            this.startCoords = ("lonlat:" + this.startInfo.member[0].longitude
            + "," + this.startInfo.member[0].latitude);
            // return this.startInfo;
        })

    }

    departureSelect(value: any){
        this.departureDay = this.today;
        switch (value) {
            case "today":
            this.departureDay = this.today;
            return;
            case "tomorrow":
            this.departureDay = this.tomorrow;
            return;
            case "twodays":
            this.departureDay = this.twoDays;
            return;
            case "threedays":
            this.departureDay = this.threeDays;
            return;
            case "fourdays":
            this.departureDay = this.fourDays;
            return;
            case "fivedays":
            this.departureDay = this.fiveDays;
            return;
            case "sixdays":
            this.departureDay = this.sixDays;
            return;
            case "sevendays":
            this.departureDay = this.sevenDays;
            return;
        }
    }

    async search(){
        const startUrl = "https://transportapi.com/v3/uk/places.json?"
        + this.transport.getAppDetails() + "&query=" + this.startInput;

        const endUrl = "https://transportapi.com/v3/uk/places.json?"
        + this.transport.getAppDetails() + "&query=" + this.endInput;

        // If not using Geolocation, get start and end coordinates from start
        //  and end inputs and pass to /journey-details page
        if (!this.isCurrentLocation){
            await this.getStartCoords().then(() => {
                this.http.get(endUrl)
                .subscribe(location => {

                    this.endInfo = location;
                    this.endCoords =  ("lonlat:" + this.endInfo.member[0].longitude
                    + "," + this.endInfo.member[0].latitude);

                    console.log(this.startCoords + " to " + this.endCoords);

                    this.router.navigate(['/journey-details', { 'start': this.startCoords,
                    'end': this.endCoords, 'startName': this.startInput, 'endName': this.endInput,
                    'departureDay': this.departureDay, 'departureTime': this.departureTime}]);
                })
            })
        // Else use current coordinates, get end coordinates from endInput and
        //     pass both to /journey-details
        } else {
            this.http.get(endUrl)
            .subscribe(location => {
                this.endInfo = location;
                this.endCoords =  ("lonlat:" + this.endInfo.member[0].longitude
                + "," + this.endInfo.member[0].latitude);

                console.log(this.startCoords + " to " + this.endCoords);

                this.router.navigate(['/journey-details', { 'start': this.startCoords,
                'end': this.endCoords, 'startName': this.startInput, 'endName': this.endInput,
                'departureDay': this.departureDay, 'departureTime': this.departureTime}]);
            })
        }

    }



}
