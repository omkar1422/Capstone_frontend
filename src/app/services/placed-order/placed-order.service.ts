import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacedOrderService {

  constructor(public httpClient: HttpClient) { }

  getPlacedOrdersByCustomer(customerId: string): Observable<any> {
    
    const url = `http://localhost:8080/restaurantListings/api/placedOrder/customer/${customerId}`
    const currentUser:any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const headers = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.get<any>(url, {headers: headers})
  }
}
