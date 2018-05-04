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
  // mapa
  map: google.maps.Map;
  // marcadores
  markers: google.maps.Marker[] = [];
  marker: google.maps.Marker;
  // restaurantes cercanos
  nearRestaurants: RestaurantsInfo[] = [];
  radius = 10;
  lat = 19.440057053713137;
  lng = -99.12704709742486;
  numRestaurants = 0;
  averageRating = 0;
  standarDeviation = 0;
  //input rating
  inputRatingMax = 0;
  inputRatingMin = 0;
  bestRest: RestaurantsInfo;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restSvc: RestaurantsDataProvider
  ) {}

  ionViewDidLoad() {
    // centrar mapa
    this.startMap();
  }
  startMap() {
    const myLatLng = new google.maps.LatLng(this.lat, this.lng);
    // crear mapa
    var mapProp = {
      center: myLatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Cargar mapa
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // crea marcador inicial
    this.initMarker(this.lat, this.lng);
    // ve eventos click
    google.maps.event.addListener(this.map, 'click', event => {
      this.clickMap(event.latLng.lat(), event.latLng.lng());
      this.lat = event.latLng.lat();
      this.lng = event.latLng.lng();
      this.marker.setMap(null);
      this.initMarker(event.latLng.lat(), event.latLng.lng());
    });
  }

  // crea punto con click o referencia
  clickMap(lat: number, lng: number) {
    // limpia valores
    this.clearMarkers();
    this.nearRestaurants.length = 0;
    // crea var
    let myLatLng = new google.maps.LatLng(lat, lng);
    let sumRating = 0;
    let sumRest = 0;
    let arrRating: number[] = [];
    arrRating.length = 0;

    // comparar  con lat lng api
    this.restSvc.getData().subscribe(data => {
      data.forEach(element => {
        let distance = this.getDist(
          lat,
          lng,
          element.address.location.lat,
          element.address.location.lng
        );
        if (distance <= this.radius * 1000) {
          this.nearRestaurants.push(element);
          sumRating += element.rating;
          sumRest++;
          arrRating.push(element.rating);
          this.addMarker(
            element.address.location.lat,
            element.address.location.lng
          );
        }
      });
      this.standarDeviation = this.getStandarDeviation(arrRating, sumRating);
      this.numRestaurants = sumRest;
      this.averageRating = sumRating / this.numRestaurants;
    });
    this.setMapOnAll();
  }
  // marcador inicial o de referencia
  initMarker(lat: number, lng: number) {
    const myLatLng = new google.maps.LatLng(lat, lng);
    this.marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Referencia',
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    this.marker.setMap(this.map);
  }
  // agrega marcadores
  addMarker(lat: number, lng: number) {
    const myLatLng = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Restaurantes'
    });
    this.markers.push(marker);
  }
  // Seta en mapa
  setMapOnAll() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(this.map);
    }
  }
  // Limpia marcadores
  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  getStandarDeviation(arrRating: Array<number>, sumRating: number): number {
    const avr = sumRating / arrRating.length;
    let sum = 0;
    arrRating.forEach(element => {
      sum += Math.pow(element - avr, 2);
    });
    return Math.sqrt(sum / arrRating.length);
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

  // bonus 3
  getRecomendation(rateMin: number, rateMax: number ) {
    
    // crea var
    let myLatLng = new google.maps.LatLng(this.lat, this.lng);
    let restaurant: RestaurantsInfo;
    let minDist: number;
    this.restSvc.getData().subscribe(data => {
      data.forEach(element => {
        let distance = this.getDist(
          this.lat,
          this.lng,
          element.address.location.lat,
          element.address.location.lng
        );
        if (distance <= this.radius * 1000 && element.rating > rateMin && element.rating <= rateMax ) {
          if (!minDist) {
             minDist = distance;
             restaurant = element;
          } else if (minDist < distance) {
            minDist = distance;
            restaurant = element;
          }
        }
      });
    this.bestRest = restaurant;
    console.log(this.bestRest)
    });

  }
}
