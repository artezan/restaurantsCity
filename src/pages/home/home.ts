import { Observable } from 'rxjs/Observable';
import { RestaurantsInfo } from './../../models/restaurants-info';
import { RestaurantsDataProvider } from './../../providers/restaurants-data/restaurants-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  restaurants$: Observable<RestaurantsInfo[]>;
  Arr = Array;
  constructor(
    public navCtrl: NavController,
    public restaurantsDataSvc: RestaurantsDataProvider
  ) {}
  ionViewDidLoad() {
    this.getDataRestaurants();
  }
  getDataRestaurants() {
  this.restaurants$ = this.restaurantsDataSvc.getData();
  this.restaurants$.subscribe(data => {
    console.log(data);
  })
  }
}
