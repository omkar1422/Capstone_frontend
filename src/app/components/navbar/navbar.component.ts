import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RestaurantsService } from 'src/app/services/home/restaurants.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchQuery: string = '';

  constructor(public authService: AuthService,private restaurantService:RestaurantsService, private menuCartService: MenuCartService
    , private router: Router
  ) {}

  onSearch() {
    this.restaurantService.setSearch(this.searchQuery);
    this.menuCartService.setSearch(this.searchQuery)
  }

  signOutUser() {
    this.authService.logoutCustomer()
    Swal.fire({
      title: 'Logged Out Successfully!',
      // text: '',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.router.navigate(['/'])
  }
}
