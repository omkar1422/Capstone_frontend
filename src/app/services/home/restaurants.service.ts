import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/model/restaurant';
import { MenuCartService } from '../menu-cart/menu-cart.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(public httpClient: HttpClient, public router: Router, public menuService: MenuCartService) { }

  getRestaurants(): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/restaurant/getAllRestaurants`
    // const currentUser:any = localStorage.getItem('currentUser');
    // const user = JSON.parse(currentUser);
    // const header = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    // return this.httpClient.get<any>(url,{headers:header})
    return this.httpClient.get<any>(url)

  }

  getAvgRating(restaurantId: string): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/rating/averageRating/${restaurantId}`
    // const currentUser:any = localStorage.getItem('currentUser');
    // const user = JSON.parse(currentUser);
    // const header = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    // return this.httpClient.get<any>(url, {headers: header})
    return this.httpClient.get<any>(url)
  }

  getAllRatings(restaurantId: number) {
    const url = `http://localhost:8080/restaurantListings/api/rating/allRatings/${restaurantId}`
    // const currentUser:any = localStorage.getItem('currentUser');
    // const user = JSON.parse(currentUser);
    // const header = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.get<any>(url)
  }
}
