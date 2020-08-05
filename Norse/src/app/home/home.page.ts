import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalPage } from './modal/modal.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private choices = [];
    private currentUser: any;
    private userOptions: any = [];
    private optionValue: any;
    private value: any;

    customAlertOptions: any = {
        cssClass: 'newuserAlert',
    };



    constructor(
        private storage: Storage,
        private modalController: ModalController,
        private actRoute: ActivatedRoute,
        private router: Router,
        private platform: Platform,
        private appLauncher: AppLauncher,
        private alertCtrl: AlertController,
    ) {}

    ngOnInit() {
    }

    ionViewWillEnter(){
        this.loadUserInfo();
    }





    openFacebook(){
        const options: AppLauncherOptions = {
        }

        if(this.platform.is('ios')) {
            options.uri = 'fb://'
        } else {
            options.packageName = 'com.facebook.katana'
        }

        this.appLauncher.canLaunch(options)
        .then((canLaunch: boolean) => console.log('Facebook is available'))
        .catch((error: any) => {
            console.error('Facebook is not available');
            this.noFacebook();
        })

    }



    async noFacebook(){
        const alert = await this.alertCtrl.create({
            header: 'Facebook not found',
            message: 'Please install to open',
            buttons: ['OK']
        });
        await alert.present();
    }



    changeSettings(value: any){
        if (value == 'new') {
            this.router.navigateByUrl('/new-user');
        } else {
            this.currentUser = value;
            this.storage.set('currentUser', value);
            this.storage.get(value).then((val) => {
                this.choices = val;
            });
        }
    }

    async loadUserInfo(){
        await this.storage.get('currentUser').then((val) => {
            this.currentUser = val;
            // Load the current user's homepage choices
            this.storage.get(this.currentUser).then((storageChoices) => {
                this.choices = storageChoices;
                // Display list of users when selecting which to choose
                this.storage.get('userList').then((users) => {
                    this.userOptions = users;
                })
            })
        })
    }


    async openModal() {
        const modal = await this.modalController.create({
            component: ModalPage,
            componentProps: {data: this.choices, currentUser: this.currentUser},
            backdropDismiss: false,
        });

        return await modal.present();
    }
}
