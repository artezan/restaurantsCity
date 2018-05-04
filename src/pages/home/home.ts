import { Observable } from 'rxjs/Observable';
import { RestaurantsInfo } from './../../models/restaurants-info';
import { RestaurantsDataProvider } from './../../providers/restaurants-data/restaurants-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { from } from 'rxjs/observable/from';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  restaurants$: Observable<RestaurantsInfo[]>;
  Arr = Array;
  isOrder = 'null';
  isRating = 'null';
  constructor(
    public navCtrl: NavController,
    public restaurantsDataSvc: RestaurantsDataProvider
  ) {}
  ionViewDidLoad() {
    this.getDataRestaurants();
  }
  getDataRestaurants() {
    this.restaurants$ = this.restaurantsDataSvc.getData();
  }
  orderByNameAsc() {
    this.isOrder = 'Dsd';
    this.isRating = 'null';
    this.restaurants$.subscribe(data => {
      data.forEach(element => {
        element.name = element.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      });
      const dataOrderByName = data.sort(function(a, b) {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      });
      this.restaurants$ = from([dataOrderByName]);
    });
  }
  orderByNameDsd() {
    this.isOrder = 'Asc';
    this.isRating = 'null';
    this.restaurants$.subscribe(data => {
      data.forEach(element => {
        element.name = element.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      });
      const dataOrderByName = data.sort(function(a, b) {
        return b.name > a.name ? 1 : a.name > b.name ? -1 : 0;
      });
      this.restaurants$ = from([dataOrderByName]);
    });
  }
  orderByRatingAsc() {
    this.isOrder = 'null';
    this.isRating = 'Dsd';
    this.restaurants$.subscribe(data => {
      data.forEach(element => {
        element.name = element.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      });
      const dataOrderByName = data.sort(function(a, b) {
        return a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0;
      });
      this.restaurants$ = from([dataOrderByName]);
    });
  }
  orderByRatingDsd() {
    this.isOrder = 'null';
    this.isRating = 'Asc';
    this.restaurants$.subscribe(data => {
      data.forEach(element => {
        element.name = element.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      });
      const dataOrderByName = data.sort(function(a, b) {
        return b.rating > a.rating ? 1 : a.rating > b.rating ? -1 : 0;
      });
      this.restaurants$ = from([dataOrderByName]);
    });
  }
  getLocation(item){
    this.navCtrl.push(ListPage,item);
  }
}
