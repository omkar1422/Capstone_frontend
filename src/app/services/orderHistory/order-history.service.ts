import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(public httpClient: HttpClient) { }

  getOrderHistoryOfCustomer(customerId: string): Observable<any> {

    const url = `http:localhost:8080/restaurantListings/api/placedOrder/customer/${customerId}`
    const currentUser: any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const header = new HttpHeaders({ Authorization: `Bearer ${user['jwt']}` });
    return this.httpClient.get<any>(url, {headers: header})
  }
}
