import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewReview } from 'src/app/model/new-review';
import { RatingOfRestaurantByCustomer } from 'src/app/model/Rating';

@Injectable({
  providedIn: 'root'
})
export class ReviewsRatingsService {

  constructor(public httpClient: HttpClient) { }
  
  saveReviewAndRating(newReview: NewReview): Observable<any> {

    const url = `http://localhost:8080/restaurantListings/api/rating`
    const currentUser:any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const headers = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.post<any>(url, newReview, {headers: headers})
  }
}
