import { Component, OnInit, Input  } from '@angular/core';
import { TransportService } from './services/transport.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-transport',
    templateUrl: './transport.page.html',
    styleUrls: ['./transport.page.scss'],
})

export class TransportPage implements OnInit {
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


    constructor(
        private transport: TransportService,
        private http: HttpClient
    ) { }

    ngOnInit() {
    }

    async fromCurrent(){
        this.inputDisabled = true;
        this.startInput = "Current Location";
        this.startCoords = await this.transport.getCurrentLocation();
        console.log(this.startCoords);
        this.isCurrentLocation = true;
        console.log(this.startInput);
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

    async search(){
        const startUrl = "https://transportapi.com/v3/uk/places.json?"
        + this.transport.getAppDetails() + "&query=" + this.startInput;

        const endUrl = "https://transportapi.com/v3/uk/places.json?"
        + this.transport.getAppDetails() + "&query=" + this.endInput;

        if (!this.isCurrentLocation){
            await this.getStartCoords().then(() => {
                this.http.get(endUrl)
              .subscribe(location => {

                  this.endInfo = location;
                  this.endCoords =  ("lonlat:" + this.endInfo.member[0].longitude
                      + "," + this.endInfo.member[0].latitude);

            })
        })
    } else {
        this.http.get(endUrl)
        .subscribe(location => {
            this.endInfo = location;
            // this.endCoords =  ("lonlat:" + location.member[0].longitude
            //     + "," + location.member[0].latitude);
            // console.log(this.endCoords);

            // this.router.navigate(['/bus-details', { 'start': bus.name,
            //  'description': bus.description, 'code': bus.atcocode}]);

      })
    }
    }



        // if (this.endInput){
        //
        //       await this.http.get(endUrl)
        //     .subscribe(location => {
        //         this.endInfo = location;
        //         return endInfo;
        //
        //
        //     })
        // }
        // console.log(this.startInfo);
        // console.log(this.endInfo);
        //  await this.getQueryCoords(this.endInput)
        // .subscribe(location => {
        //     this.endInfo = location;
        //     return this.endInfo;
        //     console.log(this.endInfo);
        //     // return this.endCoords = (this.endInfo.member[0].longitude + "," + this.endInfo.member[0].latitude);
        // });

        // this.startCoords = (this.startInfo.member[0].longitude + "," + this.startInfo.member[0].latitude);
        // this.endCoords = (this.startInfo.member[0].longitude + "," + this.startInfo.member[0].latitude);
        // console.log(this.endInfo);
        // console.log(this.startInput + " to " + this.endInput + " = "
        //     + this.startCoords + " to " + this.endCoords);

    }
