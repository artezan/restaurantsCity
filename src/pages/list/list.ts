import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { RestaurantsInfo } from '../../models/restaurants-info';
// declare var google;
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  restaurant: RestaurantsInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restaurant = navParams.data;
  }
  ionViewDidLoad() {
    const myLatLng = new google.maps.LatLng(
      this.restaurant.address.location.lat,
      this.restaurant.address.location.lng
    );
    var mapProp = {
      center: new google.maps.LatLng(
        this.restaurant.address.location.lat,
        this.restaurant.address.location.lng
      ),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
    });
  }
}
