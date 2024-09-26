import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RestaurantsService } from 'src/app/services/home/restaurants.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchQuery: string = '';

  constructor(public authService: AuthService,private restaurantService:RestaurantsService, private menuCartService: MenuCartService) {}

  onSearch() {
    this.restaurantService.setSearch(this.searchQuery);
    this.menuCartService.setSearch(this.searchQuery)
  }

  signOutUser() {
    this.authService.logoutCustomer()
  }
}
