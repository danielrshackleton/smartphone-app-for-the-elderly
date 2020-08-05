import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    newsArray: any = [];

    constructor(private news: NewsService, private router: Router) { }

    ngOnInit(): void {
        this.loadHeadlines();
    }

    loadHeadlines() {
        this.news.getNews().subscribe(news => {
            this.newsArray = news['articles'];
            console.log(this.newsArray);
        });
    }



}
