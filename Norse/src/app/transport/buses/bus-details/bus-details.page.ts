import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransportService } from '../../services/transport.service';

@Component({
    selector: 'app-bus-details',
    templateUrl: './bus-details.page.html',
    styleUrls: ['./bus-details.page.scss'],
})
export class BusDetailsPage implements OnInit {
    name: any;
    description: any;
    code:any;
    busArray: any;
    keys: any;

    constructor(
        private actRoute: ActivatedRoute,
        private transport: TransportService,
        private http: HttpClient) {
            this.name = this.actRoute.snapshot.paramMap.get('name');
            this.description =  this.actRoute.snapshot.paramMap.get('description');
            this.code =  this.actRoute.snapshot.paramMap.get('code');
            console.log(this.code);
        }

        async loadDetails(){
            const url = ('https://transportapi.com/v3/uk/bus/stop/'
            + this.code + '/live.json?'
            + this.transport.getAppDetails()
            + '&group=route&nextbuses=yes');

            await this.http.get(url).subscribe(bus => {
                this.busArray = bus;
                console.log(this.busArray);
                this.keys = Object.keys(this.busArray);
                console.log(url);
            })
        }

        ngOnInit() {
            this.loadDetails();
        }

    }
