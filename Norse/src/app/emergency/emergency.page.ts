import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-emergency',
    templateUrl: './emergency.page.html',
    styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
    contactsArray: any = [];
    healthArray: any = [];

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        this.loadInfo();
    }

    loadInfo(){
        this.http.get('assets/health.JSON').subscribe(data => {
            this.contactsArray = data['contacts'];
            this.healthArray = data['ailments'];
            // this.healthArray = this.healthArray.replace(/\n/g, '<br \/>');
        });
    }

    getContact(contact) {
        this.router.navigate(['/contacts', { 'info': contact.info,
        'number': contact.number, 'details': contact.details }]);
    }

    getInfo(item) {
        this.router.navigate(['/information', { 'condition': item.condition,
        'advice': item.advice }]);
    }

}
