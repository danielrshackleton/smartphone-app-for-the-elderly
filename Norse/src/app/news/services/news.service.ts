import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews() {
    // const url = this.baseUrl + 'top-headlines?' + this.country + this.apiKey;
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=cf89fbf83c0645b1a4a576458c33a7b8');
  }
}
