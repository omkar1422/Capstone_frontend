import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddToCart } from 'src/app/model/add-to-cart';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantsMenu } from 'src/app/model/restaurants-menu';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RestaurantsService } from 'src/app/services/home/restaurants.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {

  menus: RestaurantsMenu[] = [];
  filteredMenus: RestaurantsMenu[] = []
  selectedItems: RestaurantsMenu[] = []; // Array to store selected items
  searchSubscription!: Subscription;
  selectedFilter : string = ''
  restaurantId: string = ''
  restaurant !: Restaurant

  constructor(private menuService: MenuCartService, public authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute, private restaurantService: RestaurantsService
  ) { 
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('restaurantId')) {
        this.restaurantId = (params.get('restaurantId') ? Number(params.get('restaurantId')) : 0).toString()
        console.log("restaurantId: " + this.restaurantId);
        
      }
    })
  }

  ngOnInit(): void {
    
    this.menuService.menus$.subscribe(menus => {
      this.menus = menus;
      this.filteredMenus = menus
      this.menus.forEach(menu => menu.quantity = 0);
    });

    this.searchSubscription = this.menuService.search$.subscribe((query: string) => {
      console.log("query in menu: " + query);
      
      this.filterMenus(query);
    });

    this.getRestaurantById()
  }

  getRestaurantById() {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(
      response => {
        this.restaurant = response
      },
      error => {
        console.log("error: " + error);
        
      }
    )
  }

  selectFilter(filter: string) {
    if (this.selectedFilter === filter) {
      // Deselect if the same filter is clicked again
      this.selectedFilter = ''; 
      this.filteredMenus = this.menus; // Reset to show all menus
    } else {
      // Apply the selected filter
      this.selectedFilter = filter;
      this.applyFilter(); // Call a method to apply the selected filter
    }
  }
  
  // Method to apply the selected filter
  applyFilter() {
    switch (this.selectedFilter) {
      case 'veg':
        this.filteredMenus = this.menus.filter(menu => menu.menuType === 'veg');
        break;
      case 'non-veg':
        this.filteredMenus = this.menus.filter(menu => menu.menuType === 'non-veg');
        break;
      case '50-100':
        this.filteredMenus = this.menus.filter(menu => menu.menuPrice >= 50 && menu.menuPrice <= 100);
        break;
      case '100-200':
        this.filteredMenus = this.menus.filter(menu => menu.menuPrice >= 100 && menu.menuPrice <= 200);
        break;
      case '200-500':
        this.filteredMenus = this.menus.filter(menu => menu.menuPrice >= 200 && menu.menuPrice <= 500);
        break;
      default:
        this.filteredMenus = this.menus; // Reset to all items if no filter is selected
    }
  }
  

  filterMenus(query: string) {
    console.log("inside filterMenus");
    
    this.filteredMenus = this.menus.filter((menu) =>
      menu.menuName.toLowerCase().includes(query.toLowerCase())
    );
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

    if(! this.authService.isCustomerLoggedIn ) {
      Swal.fire({
        title: 'Error!',
        text: 'Please Log In to add items to cart',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });

      return
    }
    else{
    this.selectedItems.forEach(item => {

      this.menuService.addToCart(item)

      let addToCart: AddToCart = new AddToCart()
      addToCart.customer.customerId = this.authService.user.customerId
      addToCart.menu.menuId = item.menuId
      addToCart.qty = item.quantity

      console.log('addToCart: ' + JSON.stringify(addToCart))

      this.menuService.addItemToCart(addToCart).subscribe(reponse => {
          console.log("response: " + reponse);
          Swal.fire({
            title: 'Added items to Cart!',
            // text: 'Logged In Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/cart'])
        }, error =>  {console.log(error)
          Swal.fire({
            title: 'Failed to add items to Cart!',
            // text: 'Logged In Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
         }
      )
      

    }
    ); 
  }
    console.log('Selected items added to cart:', this.selectedItems);
    this.clearSelection();
  }

  // Clear the selection (reset quantities and selected items array)
  clearSelection() {
    this.selectedItems = [];
    this.menus.forEach(menu => menu.quantity = 0); // Reset all quantities to 0
  }
}
