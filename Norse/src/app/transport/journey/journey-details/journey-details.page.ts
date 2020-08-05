import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransportService } from '../../services/transport.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-journey-details',
  templateUrl: './journey-details.page.html',
  styleUrls: ['./journey-details.page.scss'],
})
export class JourneyDetailsPage implements OnInit {
    start: any;
    end: any;
    startName: any;
    endName: any;
    departureDay: any;
    departureTime: any;
    journeyArray: any;

  constructor(
      private actRoute: ActivatedRoute,
      private transport: TransportService,
      private http: HttpClient,
      private datePipe: DatePipe
  ) {
      this.start = this.actRoute.snapshot.paramMap.get('start');
      this.end =  this.actRoute.snapshot.paramMap.get('end');
      this.startName = this.actRoute.snapshot.paramMap.get('startName');
      this.endName = this.actRoute.snapshot.paramMap.get('endName');
      this.departureDay = this.actRoute.snapshot.paramMap.get('departureDay');
      this.departureTime = this.actRoute.snapshot.paramMap.get('departureTime');
    }

    ngOnInit() {
        this.loadDetails();
    }









    async loadDetails(){
        // Format departureDay and departureTime so they can be used in the
        //  get request
        this.departureDay = this.datePipe.transform(this.departureDay, 'yyyy-MM-dd');
        this.departureTime = this.departureTime.substring(0,5);

        const url = ('https://transportapi.com/v3/uk/public/journey/from/'
            + this.start + "/to/" + this.end + "/at/" + this.departureDay + "/" +
            this.departureTime + ".json?" +
            this.transport.getAppDetails() + '&service=southeast');
        // const url = ('assets/test2.JSON');

        // Get journey details
        await this.http.get(url).subscribe(journey => {
            this.journeyArray = journey;
            console.log(this.departureDay + "," + this.departureTime);
            console.log(url);
            return this.journeyArray;
        })
    }


}
