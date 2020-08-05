import { Component, OnInit, Input  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
    private user: any;
    @Input() userInput: any;
    private nameTaken: boolean = false;
    private noCurrentUser: boolean = true;
    private currentUser: any;

    constructor(
      private storage: Storage,
      private router: Router,
      private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.clear();
        this.getPreviousUser();
    }

    clear() {
        this.userInput = '';
    }

    async getPreviousUser(){
        await this.storage.get('currentUser').then((val) => {
            this.currentUser = val;
        })
        if (this.currentUser != null){
            this.noCurrentUser = false;
        }
    }

    async nameTakenAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Name Taken',
            message: 'Please choose another name',
            buttons: ['OK']
        });
        await alert.present();
    }

    async goChoicesPage(){
        await this.storage.get(this.userInput).then((name) => {
            this.user = name;
            this.nameTaken = true;
        })

        if (this.user == null){
            this.nameTaken = false;
        }

        if (this.nameTaken == false){
            this.router.navigate(['/choices', { 'user': this.userInput}]);
        } else {
            this.nameTakenAlert();
        }
    }

}
