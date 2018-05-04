webpackJsonp([1],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bonus2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_restaurants_data_restaurants_data__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Bonus2Page = /** @class */ (function () {
    function Bonus2Page(navCtrl, navParams, restSvc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restSvc = restSvc;
        // marcadores
        this.markers = [];
        // restaurantes cercanos
        this.nearRestaurants = [];
        this.radius = 10;
        this.lat = 19.440057053713137;
        this.lng = -99.12704709742486;
        this.numRestaurants = 0;
        this.averageRating = 0;
        this.standarDeviation = 0;
        //input rating
        this.inputRatingMax = 0;
        this.inputRatingMin = 0;
    }
    Bonus2Page.prototype.ionViewDidLoad = function () {
        // centrar mapa
        this.startMap();
    };
    Bonus2Page.prototype.startMap = function () {
        var _this = this;
        var myLatLng = new google.maps.LatLng(this.lat, this.lng);
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
        google.maps.event.addListener(this.map, 'click', function (event) {
            _this.clickMap(event.latLng.lat(), event.latLng.lng());
            _this.lat = event.latLng.lat();
            _this.lng = event.latLng.lng();
            _this.marker.setMap(null);
            _this.initMarker(event.latLng.lat(), event.latLng.lng());
        });
    };
    // crea punto con click o referencia
    Bonus2Page.prototype.clickMap = function (lat, lng) {
        var _this = this;
        // limpia valores
        this.clearMarkers();
        this.nearRestaurants.length = 0;
        // crea var
        var myLatLng = new google.maps.LatLng(lat, lng);
        var sumRating = 0;
        var sumRest = 0;
        var arrRating = [];
        arrRating.length = 0;
        // comparar  con lat lng api
        this.restSvc.getData().subscribe(function (data) {
            data.forEach(function (element) {
                var distance = _this.getDist(lat, lng, element.address.location.lat, element.address.location.lng);
                if (distance <= _this.radius * 1000) {
                    _this.nearRestaurants.push(element);
                    sumRating += element.rating;
                    sumRest++;
                    arrRating.push(element.rating);
                    _this.addMarker(element.address.location.lat, element.address.location.lng);
                }
            });
            _this.standarDeviation = _this.getStandarDeviation(arrRating, sumRating);
            _this.numRestaurants = sumRest;
            _this.averageRating = sumRating / _this.numRestaurants;
        });
        this.setMapOnAll();
    };
    // marcador inicial o de referencia
    Bonus2Page.prototype.initMarker = function (lat, lng) {
        var myLatLng = new google.maps.LatLng(lat, lng);
        this.marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: 'Referencia',
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
        this.marker.setMap(this.map);
    };
    // agrega marcadores
    Bonus2Page.prototype.addMarker = function (lat, lng) {
        var myLatLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: 'Restaurantes'
        });
        this.markers.push(marker);
    };
    // Seta en mapa
    Bonus2Page.prototype.setMapOnAll = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
        }
    };
    // Limpia marcadores
    Bonus2Page.prototype.clearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    };
    Bonus2Page.prototype.getStandarDeviation = function (arrRating, sumRating) {
        var avr = sumRating / arrRating.length;
        var sum = 0;
        arrRating.forEach(function (element) {
            sum += Math.pow(element - avr, 2);
        });
        return Math.sqrt(sum / arrRating.length);
    };
    // calcula distancia en metros
    /**
     *
     * @param lat1
     * @param lon1
     * @param lat2
     * @param lon2
     */
    Bonus2Page.prototype.getDist = function (lat1, lon1, lat2, lon2) {
        // Convert degrees to radians
        lat1 = lat1 * 3.141592 / 180.0;
        lon1 = lon1 * 3.141592 / 180.0;
        lat2 = lat2 * 3.141592 / 180.0;
        lon2 = lon2 * 3.141592 / 180.0;
        // radius of earth in metres
        var r = 6378100;
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
    };
    // bonus 3
    Bonus2Page.prototype.getRecomendation = function (rateMin, rateMax) {
        var _this = this;
        // crea var
        var myLatLng = new google.maps.LatLng(this.lat, this.lng);
        var restaurant;
        var minDist;
        this.restSvc.getData().subscribe(function (data) {
            data.forEach(function (element) {
                var distance = _this.getDist(_this.lat, _this.lng, element.address.location.lat, element.address.location.lng);
                if (distance <= _this.radius * 1000 && element.rating > rateMin && element.rating <= rateMax) {
                    if (!minDist) {
                        minDist = distance;
                        restaurant = element;
                    }
                    else if (minDist < distance) {
                        minDist = distance;
                        restaurant = element;
                    }
                }
            });
            _this.bestRest = restaurant;
            console.log(_this.bestRest);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('gmap'),
        __metadata("design:type", Object)
    ], Bonus2Page.prototype, "gmapElement", void 0);
    Bonus2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-bonus2',template:/*ion-inline-start:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\pages\bonus2\bonus2.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bonus 2 and Bonus 3</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h2>Write or click a map point and enter radius to see restaurants near</h2>\n  <ion-grid fixed>\n    <ion-row>\n\n      <ion-col>\n        <ion-item>\n          <ion-label color="primary" floating>Enter Lat</ion-label>\n          <ion-input type="number" [(ngModel)]="lat"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label color="primary" floating>Enter Lng</ion-label>\n          <ion-input type="number" [(ngModel)]="lng"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label color="primary" floating>Enter radius (Km)</ion-label>\n          <ion-input type="number" [(ngModel)]="radius"></ion-input>\n        </ion-item>\n\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-6>\n        <button fixed ion-button color="danger" round (click)="startMap(); clickMap(lat, lng)">\n          View Restaurants\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n\n  <!-- Start Data -->\n  <ion-grid fixed>\n    <ion-row>\n      <ion-col>\n        <ion-card color="indigo">\n          <ion-card-header>\n            <ion-icon name="globe"></ion-icon>\n            Count of all the restaurants within radius\n          </ion-card-header>\n          <ion-card-content>\n            <h2>{{numRestaurants}}</h2>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col>\n        <ion-card color="indigo">\n          <ion-card-header>\n            <ion-icon name="star"></ion-icon>\n            Average Rating\n          </ion-card-header>\n          <ion-card-content>\n            <h2>{{averageRating.toFixed(3)}}</h2>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col>\n        <ion-card color="indigo">\n          <ion-card-header>\n            <ion-icon name="md-analytics"></ion-icon>\n            Standard deviation of rating\n          </ion-card-header>\n          <ion-card-content>\n            <h2>{{standarDeviation}}</h2>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-card color="blue">\n        <ion-card-header>\n          <ion-icon name="happy"></ion-icon>\n          The nearest restaurants in the zone given a point in a map\n        </ion-card-header>\n        <p>Enter a Rate</p>\n        <ion-row>\n          <ion-col col-md-2>\n            <ion-item>\n              <ion-label>Max</ion-label>\n              <ion-input type="number" [(ngModel)]="inputRatingMax"></ion-input>\n            </ion-item>\n          </ion-col>\n          <ion-col col-md-2>\n            <ion-item>\n              <ion-label>Min</ion-label>\n              <ion-input type="number" [(ngModel)]="inputRatingMin"></ion-input>\n            </ion-item>\n          </ion-col>\n          <ion-col col-md-2>\n            <button fixed ion-button color="danger" round (click)="getRecomendation(inputRatingMin,inputRatingMax)">\n              Find\n            </button>\n          </ion-col>\n        </ion-row>\n        <ion-card-content *ngIf="bestRest">\n          <ion-list>\n            <h2>\n              <b>Name</b> {{bestRest.name}}\n            </h2>\n            <h2>\n              <b>Rating</b> {{bestRest.rating}}\n            </h2>\n            <h2>\n              <b>City</b> {{bestRest.address.city}}\n            </h2>\n            <h2>\n              <b>State</b> {{bestRest.address.state}}\n            </h2>\n            <h2>\n              <b>Street</b> {{bestRest.address.street}}\n            </h2>\n            <h2>\n              <b>Contact</b> {{bestRest.contact.phone}}\n            </h2>\n          </ion-list>\n\n        </ion-card-content>\n      </ion-card>\n    </ion-row>\n    <ion-card>\n      <ion-navbar color="primary">\n        <ion-card-title style="color: #fff;">\n          Restaurants within radius\n        </ion-card-title>\n      </ion-navbar>\n      <div #gmap class="map-responsive"></div>\n    </ion-card>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\pages\bonus2\bonus2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_restaurants_data_restaurants_data__["a" /* RestaurantsDataProvider */]])
    ], Bonus2Page);
    return Bonus2Page;
}());

//# sourceMappingURL=bonus2.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/bonus2/bonus2.module": [
		285,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_restaurants_data_restaurants_data__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_list__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, restaurantsDataSvc) {
        this.navCtrl = navCtrl;
        this.restaurantsDataSvc = restaurantsDataSvc;
        this.Arr = Array;
        this.isOrder = 'null';
        this.isRating = 'null';
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.getDataRestaurants();
    };
    HomePage.prototype.getDataRestaurants = function () {
        this.restaurants$ = this.restaurantsDataSvc.getData();
    };
    HomePage.prototype.orderByNameAsc = function () {
        var _this = this;
        this.isOrder = 'Dsd';
        this.isRating = 'null';
        this.restaurants$.subscribe(function (data) {
            data.forEach(function (element) {
                element.name = element.name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
            });
            var dataOrderByName = data.sort(function (a, b) {
                return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
            });
            _this.restaurants$ = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__["from"])([dataOrderByName]);
        });
    };
    HomePage.prototype.orderByNameDsd = function () {
        var _this = this;
        this.isOrder = 'Asc';
        this.isRating = 'null';
        this.restaurants$.subscribe(function (data) {
            data.forEach(function (element) {
                element.name = element.name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
            });
            var dataOrderByName = data.sort(function (a, b) {
                return b.name > a.name ? 1 : a.name > b.name ? -1 : 0;
            });
            _this.restaurants$ = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__["from"])([dataOrderByName]);
        });
    };
    HomePage.prototype.orderByRatingAsc = function () {
        var _this = this;
        this.isOrder = 'null';
        this.isRating = 'Dsd';
        this.restaurants$.subscribe(function (data) {
            data.forEach(function (element) {
                element.name = element.name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
            });
            var dataOrderByName = data.sort(function (a, b) {
                return a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0;
            });
            _this.restaurants$ = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__["from"])([dataOrderByName]);
        });
    };
    HomePage.prototype.orderByRatingDsd = function () {
        var _this = this;
        this.isOrder = 'null';
        this.isRating = 'Asc';
        this.restaurants$.subscribe(function (data) {
            data.forEach(function (element) {
                element.name = element.name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
            });
            var dataOrderByName = data.sort(function (a, b) {
                return b.rating > a.rating ? 1 : a.rating > b.rating ? -1 : 0;
            });
            _this.restaurants$ = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__["from"])([dataOrderByName]);
        });
    };
    HomePage.prototype.getLocation = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__list_list__["a" /* ListPage */], item);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Restaurants</ion-title>\n  </ion-navbar>\n  <ion-toolbar color="primary" no-border-top>\n    <button *ngIf="isOrder === \'Asc\'" (click)="orderByNameAsc()" ion-button item-end icon-left round color="danger">\n      <ion-icon name="md-arrow-down"></ion-icon> Order by Name\n    </button>\n    <button *ngIf="isOrder === \'Dsd\'" (click)="orderByNameDsd()" ion-button item-end icon-left round color="danger">\n      <ion-icon name="md-arrow-up"></ion-icon> Order by Name\n    </button>\n    <button *ngIf="isOrder === \'null\'" (click)="orderByNameAsc()" ion-button item-end icon-left round color="danger">\n      <ion-icon name="ios-funnel"></ion-icon> Order by Name\n    </button>\n    <button *ngIf="isRating === \'Asc\'" (click)="orderByRatingAsc()" ion-button item-end icon-left round color="danger">\n      <ion-icon name="md-arrow-up"></ion-icon> Order by Rating\n    </button>\n    <button *ngIf="isRating === \'Dsd\'" (click)="orderByRatingDsd()" ion-button item-end icon-left round color="danger">\n      <ion-icon name="md-arrow-down"></ion-icon> Order by Rating\n    </button>\n    <button *ngIf="isRating === \'null\'" (click)="orderByRatingAsc()" ion-button item-end icon-left round color="danger">\n      <ion-icon name="ios-funnel"></ion-icon> Order by Rating\n    </button>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <h2 text-center>Select one restaurant for more details</h2>\n  <p text-center>Bonus 2 and 3 on the slide menu at the left top </p>\n  <ion-grid fixed>\n    <ion-list text-wrap>\n      <button ion-item  *ngFor="let restaurant of restaurants$ | async" (click)="getLocation(restaurant)">\n        <ion-avatar item-start>\n          <ion-icon name="restaurant"></ion-icon>\n        </ion-avatar>\n        <h2>{{restaurant.name}}</h2>\n        <p>{{restaurant.address.city}}</p>\n        <span *ngIf="restaurant.rating > 0" item-end>\n          <ion-icon color="primary" *ngFor="let starts of Arr(restaurant.rating).fill(1)" name="star">\n          </ion-icon>\n        </span>\n\n\n\n        <span *ngIf="restaurant.rating === 0" item-end>\n          <b ion-text text-center>No rating</b>\n          <ion-icon name="thumbs-down"></ion-icon>\n        </span>\n\n      </button>\n    </ion-list>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_restaurants_data_restaurants_data__["a" /* RestaurantsDataProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// declare var google;
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restaurant = navParams.data;
    }
    ListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var myLatLng = new google.maps.LatLng(this.restaurant.address.location.lat, this.restaurant.address.location.lng);
        var mapProp = {
            center: new google.maps.LatLng(this.restaurant.address.location.lat, this.restaurant.address.location.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: _this.map,
                title: 'Hello World!'
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('gmap'),
        __metadata("design:type", Object)
    ], ListPage.prototype, "gmapElement", void 0);
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Details</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid fixed>\n    <ion-card>\n      <ion-navbar color="primary">\n        <ion-card-title style="color: #fff;">\n          {{restaurant.name}} \n        </ion-card-title>\n      </ion-navbar>\n      <ion-card-content>\n        <ion-list>\n          <h3 ion-item>\n            <b>Name:</b> {{restaurant.name}}</h3>\n          <h3 ion-item>\n            <b>Site:</b> {{restaurant.contact.site}}</h3>\n          <h3 ion-item>\n            <b>Phone:</b> {{restaurant.contact.phone}}</h3>\n          <h3 ion-item>\n            <b>Email:</b> {{restaurant.contact.email}}</h3>\n          <h3 ion-item>\n            <b>City:</b> {{restaurant.address.city}}</h3>\n          <h3 ion-item>\n            <b>State:</b> {{restaurant.address.state}}</h3>\n          <h3 ion-item>\n            <b>Street:</b> {{restaurant.address.street}}</h3>\n\n        </ion-list>\n\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-navbar color="primary">\n        <ion-card-title style="color: #fff;">\n          Geographic Location\n        </ion-card-title>\n      </ion-navbar>\n      <div #gmap class="map-responsive"></div>\n    </ion-card>\n\n\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_restaurants_data_restaurants_data__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_bonus2_bonus2__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// http module








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_bonus2_bonus2__["a" /* Bonus2Page */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/bonus2/bonus2.module#Bonus2PageModule', name: 'Bonus2Page', segment: 'bonus2', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_bonus2_bonus2__["a" /* Bonus2Page */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_restaurants_data_restaurants_data__["a" /* RestaurantsDataProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_bonus2_bonus2__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Bonus2', component: __WEBPACK_IMPORTED_MODULE_5__pages_bonus2_bonus2__["a" /* Bonus2Page */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\Ghost Games\documentos\prueba inter\restaurantsCity\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantsDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the RestaurantsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestaurantsDataProvider = /** @class */ (function () {
    function RestaurantsDataProvider(http) {
        this.http = http;
        this.URL_INFO = 'https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json';
    }
    RestaurantsDataProvider.prototype.getData = function () {
        return this.http.get(this.URL_INFO);
    };
    RestaurantsDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RestaurantsDataProvider);
    return RestaurantsDataProvider;
}());

//# sourceMappingURL=restaurants-data.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map