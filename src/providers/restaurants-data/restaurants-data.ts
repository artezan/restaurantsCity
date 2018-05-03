import { RestaurantsInfo } from './../../models/restaurants-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestaurantsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestaurantsDataProvider {
URL_INFO = 'https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json';
  constructor(public http: HttpClient) {
  }
  getData(): Observable<RestaurantsInfo[]> {
    return this.http.get<RestaurantsInfo[]>(this.URL_INFO);

  }

}
