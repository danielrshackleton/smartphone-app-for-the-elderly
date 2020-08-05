import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
    condition: any;
    advice: any;

  constructor(private actRoute: ActivatedRoute) {
      this.condition = this.actRoute.snapshot.paramMap.get('condition');
      this.advice = this.actRoute.snapshot.paramMap.get('advice');
  }

  ngOnInit() {
  }


}
