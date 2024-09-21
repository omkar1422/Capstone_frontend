import { Component } from '@angular/core';
import { AddToCart } from 'src/app/model/add-to-cart';
import { RestaurantsMenu } from 'src/app/model/restaurants-menu';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {

  menus: RestaurantsMenu[] = [];
  selectedItems: RestaurantsMenu[] = []; // Array to store selected items

  constructor(private menuService: MenuCartService, public authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to menu service to fetch menu items
    this.menuService.menus$.subscribe(menus => {
      this.menus = menus;
      // Initialize quantity to 0 for all items
      this.menus.forEach(menu => menu.quantity = 0);
    });
  }

  // Adds an item to the selected items array (initially sets quantity to 1)
  addToSelection(menu: RestaurantsMenu) {
    menu.quantity = 1; // Set the initial quantity to 1
    console.log("menu in addToSelection: " + JSON.stringify(menu));

    if (!this.selectedItems.includes(menu)) {
      this.selectedItems.push(menu); // Add item to selected items if not already there
      console.log("this.selectedItems: " + JSON.stringify(this.selectedItems))
    }
  }

  incrementQuantity(menu: RestaurantsMenu) {
    menu.quantity++;
    console.log("menu in incrementQuantity: " + JSON.stringify(menu));

    if (!this.selectedItems.includes(menu)) {
      this.selectedItems.push(menu); // Add item to selected items if not already there
      console.log("this.selectedItems: " + JSON.stringify(this.selectedItems))

    }
  }

  decrementQuantity(menu: RestaurantsMenu) {
    if (menu.quantity > 0) {
      menu.quantity--;
      console.log("menu in decrementQuantity: " + JSON.stringify(menu));

      // If quantity is 0, remove the item from selected items
      if (menu.quantity === 0) {
        this.selectedItems = this.selectedItems.filter(item => item.menuId !== menu.menuId);
        console.log("this.selectedItems: " + JSON.stringify(this.selectedItems))

      }
    }
  }

  finalizeAddToCart() {
    this.selectedItems.forEach(item => {

      this.menuService.addToCart(item)

      let addToCart: AddToCart = new AddToCart()
      addToCart.customer.customerId = this.authService.user.customerId
      addToCart.menu.menuId = item.menuId
      addToCart.qty = item.quantity

      console.log('addToCart: ' + JSON.stringify(addToCart))

      this.menuService.addItemToCart(addToCart).subscribe(reponse => {
          console.log("response: " + reponse);
        }, error => console.log(error)
      )

    }
    ); 
    console.log('Selected items added to cart:', this.selectedItems);
    this.clearSelection();
  }

  // Clear the selection (reset quantities and selected items array)
  clearSelection() {
    this.selectedItems = [];
    this.menus.forEach(menu => menu.quantity = 0); // Reset all quantities to 0
  }
}
