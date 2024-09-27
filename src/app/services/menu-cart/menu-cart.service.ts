import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AddToCart } from 'src/app/model/add-to-cart';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantsMenu } from 'src/app/model/restaurants-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuCartService {

  private menusSubject = new BehaviorSubject<any[]>([]); // Initialize with empty array
  public menus$ = this.menusSubject.asObservable(); // Expose the observable

  private cartItems: RestaurantsMenu[] = [];
  private cartItemsSubject = new BehaviorSubject<RestaurantsMenu[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private searchString = new BehaviorSubject<string>("")

  search$ = this.searchString.asObservable();

  constructor(public httpClient: HttpClient, public router: Router) { }

  setSearch(search:string){
    this.searchString.next(search);
  }

  addToCart(menu: RestaurantsMenu) {
    const existingItem = this.cartItems.find(item => item.menuId === menu.menuId);
    if (existingItem) {
      console.log("menu in addToCart of service" + JSON.stringify(menu));
      
      existingItem.quantity = menu.quantity; // Update quantity if already exists
    } else {
      console.log("menu in addToCart of service" + JSON.stringify(menu));

      this.cartItems.push(menu); // Add new item to cart
    }
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  // Remove an item from the cart
  removeFromCart(menuId: number) {
    this.cartItems = this.cartItems.filter(item => item.menuId !== menuId);
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  // Get all cart items
  getCartItems(): RestaurantsMenu[] {
    return this.cartItems;
  }

  // Clear the cart
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  getRestaurantById(restaurant: Restaurant){
    
    const url = `http://localhost:8080/restaurantListings/api/restaurant/getById/${restaurant.restaurantId}`;
    this.httpClient.get<any>(url).subscribe(
      response => {
        this.menusSubject.next(response.menus); // Update the BehaviorSubject with new menus
        this.router.navigate([`/restaurantDetails/${restaurant.restaurantId}`]);
      },
      error => {
        console.error('Error fetching restaurant data', error);
        console.log(error.message);
      }
    );
  }

  addItemToCart(cartItem: AddToCart): Observable<any> {
    const url = "http://localhost:8080/restaurantListings/api/cart"
    const currentUser:any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const headers = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.post<any>(url, cartItem, {headers: headers})
  }

  getCartItemsByCustomer(customerId: string): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/cart/cartItems/${customerId}`
    const currentUser:any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const headers = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.get<any>(url, {headers: headers});
  } 

  removeItemFromCart(cartId: string): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/cart/deleteCartItem/${cartId}`
    const currentUser:any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const headers = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.delete<any>(url, {headers: headers})
  }

  removeAllCartItems(customerId: string): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/cart/deleteCart/${customerId}`
    const currentUser:any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const headers = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.delete<any>(url, {headers: headers})
  }

  placeOrderFromCart(customerId: string): Observable<any> {
    const url = `http://localhost:8080/restaurantListings/api/placedOrder/placeOrderFromCart/${customerId}`
    const currentUser:any = localStorage.getItem('currentUser');
    const user = JSON.parse(currentUser);
    const headers = new HttpHeaders({Authorization: `Bearer ${user['jwt']}`})
    return this.httpClient.get<any>(url, {headers: headers})
  } 
}
