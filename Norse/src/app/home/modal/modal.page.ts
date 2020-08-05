import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

    myData: any = [];
    user: any;

    constructor(
        private storage: Storage,
        private modalController: ModalController,
        private navCtrl: NavController,
        private navParams: NavParams) { }

        ionViewWillEnter() {
            this.myData = this.navParams.get('data');
            this.user = this.navParams.get('currentUser');
        }

        close() {
            let myChoices = this.myData;
            this.storage.set(this.user, myChoices);
            this.modalController.dismiss();
        }

        saveChoices() {

            let myChoices = this.myData;
            this.storage.set(this.user, myChoices);
            this.modalController.dismiss();
        }
    }
