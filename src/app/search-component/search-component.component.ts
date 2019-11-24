import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  public linkArray: any;
  public realData: any;
  public searchField: any;
  public showKeyword: Boolean=  false;
  public keyword : String;
  url = 'https://hn.algolia.com/api/v1/search?';
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.subscribeFunction();
  }
  subscribeFunction() {
    this.httpService.get(this.url)
      .subscribe(
        data => {
          this.linkArray = data as string[];
          this.realData = this.linkArray.hits;
          this.url = 'https://hn.algolia.com/api/v1/search?';
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      )
  }

  clearSearchField() {
    this.searchField = '';
  }

  search() {
    this.url = this.url + 'query=' + this.searchField;
    this.subscribeFunction();
    this.showKeyword = true;
    this.keyword = this.searchField;
  }



}
