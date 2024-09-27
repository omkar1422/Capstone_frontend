import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from 'src/app/model/restaurant';
import { MenuCartService } from '../menu-cart/menu-cart.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private searchString = new BehaviorSubject<string>("")

  search$ = this.searchString.asObservable();

  constructor(public httpClient: HttpClient, public router: Router, public menuService: MenuCartService) { }

  getRestaurants(): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/restaurant/getAllRestaurants`
    return this.httpClient.get<any>(url)

  }

  setSearch(search:string){
    this.searchString.next(search);
  }

  getAvgRating(restaurantId: string): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/rating/averageRating/${restaurantId}`
    return this.httpClient.get<any>(url)
  }

  getAllRatings(restaurantId: number): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/rating/allRatings/${restaurantId}`
    return this.httpClient.get<any>(url)
  }

  getRestaurantById(restaurantId: string): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/restaurant/getById/${restaurantId}`
    return this.httpClient.get<any>(url)
  }
}
