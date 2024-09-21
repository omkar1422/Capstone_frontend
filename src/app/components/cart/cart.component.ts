import { Component } from '@angular/core';
import { CartByCustomer } from 'src/app/model/cart-by-customer';
import { Menu } from 'src/app/model/Menu';
import { RestaurantsMenu } from 'src/app/model/restaurants-menu';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems!: CartByCustomer[]
  totalCartPrice: number = 0
  
  constructor(private menuCartService: MenuCartService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getCartItemsByCustomer()
    
  }

  calculateTotalCartPrice() {
    this.cartItems.forEach(item => {
      this.totalCartPrice += item.menu.menuPrice * item.qty;
    });
    console.log("this.totalCartPrice: " + this.totalCartPrice);
    
  }

  getCartItemsByCustomer() {
    this.menuCartService.getCartItemsByCustomer(this.authService.user.customerId).subscribe(
      response => {
        this.cartItems = response || [];  // Ensure it's an array, even if response is undefined
        this.calculateTotalCartPrice();        
      },
      error => console.log(error)
    )
    // this.calculateTotalCartPrice()
  }

  removeItemFromCart(menu: Menu, cartId: string) {
    this.menuCartService.removeItemFromCart(cartId).subscribe(
      response => {
        console.log("response: " + JSON.stringify(response));
        this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
      },
      error => console.log(error)
    )
  }

  clearCart(customerId: string) {
    this.menuCartService.removeAllCartItems(customerId).subscribe(
      response => {
        console.log("response: " + response);
        this.cartItems = []
      },
      error => console.log("error: " + error)
    )
  }

  buyAllCartItems(customerId: string) {
    this.menuCartService.placeOrderFromCart(customerId).subscribe(
      response => {
        console.log("response: " + JSON.stringify(response))
        
        this.cartItems = []
      },
      error => console.log("error: " + error)
      
    )
  }
}
