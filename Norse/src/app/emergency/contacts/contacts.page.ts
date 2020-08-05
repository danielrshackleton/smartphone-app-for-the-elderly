import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.page.html',
    styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
    info: any;
    number: any;
    details: any;

    constructor(private actRoute: ActivatedRoute, private callNumber: CallNumber, public alertController: AlertController) {
        this.info = this.actRoute.snapshot.paramMap.get('info');
        this.number = this.actRoute.snapshot.paramMap.get('number');
        this.details = this.actRoute.snapshot.paramMap.get('details');
    }

    ngOnInit() {
    }

    async presentErrorAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'This device is unable to make calls.',
            buttons: ['Close']
        });

        await alert.present();
    }

    callNum(){
        this.callNumber.callNumber(this.number, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => this.presentErrorAlert());
    }

}
