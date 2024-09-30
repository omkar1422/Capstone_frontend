import { Component, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartByCustomer } from 'src/app/model/cart-by-customer';
import { Menu } from 'src/app/model/Menu';
import { RestaurantsMenu } from 'src/app/model/restaurants-menu';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems!: CartByCustomer[]
  totalCartPrice: number = 0
  
  constructor(private menuCartService: MenuCartService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCartItemsByCustomer()
  }

  increementQuantity(cartItem: CartByCustomer) {
    cartItem.qty++

    this.menuCartService.updateCartItem(cartItem).subscribe(
      response => {
        console.log("response: " + JSON.stringify(response));
        
      }
    )
    this.calculateTotalCartPrice()

  }

  decreementQuantity(cartItem: CartByCustomer) {

    if(cartItem.qty > 0) {
      cartItem.qty--
    }

    if(cartItem.qty === 0) {
      this.removeItemFromCart(cartItem.menu, cartItem.cartId)
    }

    this.menuCartService.updateCartItem(cartItem).subscribe(
      response => {
        console.log("response: " + JSON.stringify(response));
        
      }
    )
    this.calculateTotalCartPrice()
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

        Swal.fire({
          title: 'Success!',
          text: 'Placed Order successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/'])
      },
      error => console.log("error: " + error)
      
    )
  }
}
