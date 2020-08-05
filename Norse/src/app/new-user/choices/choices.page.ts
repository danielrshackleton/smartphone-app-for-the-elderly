import { Component, OnInit, Input  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-choices',
    templateUrl: './choices.page.html',
    styleUrls: ['./choices.page.scss'],
})
export class ChoicesPage implements OnInit {
    private choices = [];
    private user: any;
    private userList: any = [];
    private storageCheck: any = [];
    private userInput: any;

    constructor (
        private actRoute: ActivatedRoute,
        private storage: Storage,
        private router: Router
    ) {
        this.userInput = this.actRoute.snapshot.paramMap.get('user');
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.clear();
        this.checkUserList();
    }

    clear(){
        this.choices = [
            { val: 'News', isChecked: false, imgSrc: 'assets/bbc.jpg', route: '/news' },
            { val: 'Weather', isChecked: false, imgSrc: 'assets/weather.jpg', route: '/weather' },
            { val: 'Emergency', isChecked: false, imgSrc: 'assets/nhs.jpg', route: '/emergency' },
            { val: 'Transport', isChecked: false, imgSrc: 'assets/transport.jpg', route: '/transport-tabs/journey' },
            { val: 'Facebook', isChecked: false, route: '', isFacebook: true, imgSrc: 'assets/facebook.jpg' }
        ];
    }

    checkUserList() {
        this.storage.get('userList').then((list) => {
            this.storageCheck = list;
            if (this.storageCheck !== null){
                this.userList = list;
            }
        });
    }

    async save(){
        this.storage.set('currentUser', this.userInput);
        // Add user to userList and save
        this.userList.push(this.userInput);
        this.storage.set('userList', this.userList);
        // Save user and user's choices
        let myChoices = this.choices;
        this.storage.set(this.userInput, myChoices);
        this.router.navigate(['/home']);
    }

}
