import { RestaurantsInfo } from './../../models/restaurants-info';
import { RestaurantsDataProvider } from './../../providers/restaurants-data/restaurants-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-bonus2',
  templateUrl: 'bonus2.html'
})
export class Bonus2Page {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  markers= [];
  nearRestaurants: RestaurantsInfo[] = [];
  radius = 10;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restSvc: RestaurantsDataProvider
  ) {}

  ionViewDidLoad() {
    // centrar mapa
    const myLatLng = new google.maps.LatLng(
      19.440057053713137,
      -99.12704709742486
    );
    // crear mapa
    var mapProp = {
      center: new google.maps.LatLng(19.440057053713137, -99.12704709742486),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Cargar mapa
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // crea mmarcador
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
    });
    // ve eventos click
    google.maps.event.addListener(this.map, 'click', event => {
      this.clickMap(event.latLng.lat(), event.latLng.lng());
    });
  }
  // crea marcador con click
  clickMap(lat: number, lng: number) {
    this.clearMarkers();
    this.nearRestaurants.length = 0;
    const myLatLng = new google.maps.LatLng(lat, lng);
    // comparar click con lat lng api
    this.restSvc.getData().subscribe(data => {
      data.forEach(element => {
        let distance = this.getDist(
          lat,
          lng,
          element.address.location.lat,
          element.address.location.lng
        );
        if (distance <= this.radius*1000) {
          this.nearRestaurants.push(element);
          this.addMarker(
            element.address.location.lat,
            element.address.location.lng
          );
        }
      });
    });

    console.log(this.nearRestaurants);
    this.setMapOnAll()
  }
  addMarker(lat: number, lng: number) {
    const myLatLng = new google.maps.LatLng(lat, lng);
    
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      this.markers.push(marker);
    
  }
  setMapOnAll() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(this.map);
    }
  }
  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  // calcula distancia en metros
  /**
   *
   * @param lat1
   * @param lon1
   * @param lat2
   * @param lon2
   */
  getDist(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Convert degrees to radians
    lat1 = lat1 * 3.141592 / 180.0;
    lon1 = lon1 * 3.141592 / 180.0;

    lat2 = lat2 * 3.141592 / 180.0;
    lon2 = lon2 * 3.141592 / 180.0;

    // radius of earth in metres
    const r = 6378100;

    // P
    var rho1 = r * Math.cos(lat1);
    var z1 = r * Math.sin(lat1);
    var x1 = rho1 * Math.cos(lon1);
    var y1 = rho1 * Math.sin(lon1);
    // Q
    var rho2 = r * Math.cos(lat2);
    var z2 = r * Math.sin(lat2);
    var x2 = rho2 * Math.cos(lon2);
    var y2 = rho2 * Math.sin(lon2);

    // Dot product
    var dot = x1 * x2 + y1 * y2 + z1 * z2;
    var cos_theta = dot / (r * r);
    var theta = Math.acos(cos_theta);

    // Distance in Metres
    var dist = r * theta;
    return dist;
  }
}
