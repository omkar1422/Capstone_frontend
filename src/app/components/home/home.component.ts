import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantsService } from 'src/app/services/home/restaurants.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent {

  restaurantsList!: Restaurant[]
  filteredRestaurants!: Restaurant[];
  searchSubscription!: Subscription;
  selectedFilter: string = ''; 

  constructor(public restaurantsService: RestaurantsService, public menuService: MenuCartService) { }

  ngOnInit() {
    
    this.getAllRestaurants()

    this.searchSubscription = this.restaurantsService.search$.subscribe((query: string) => {
      console.log("query in home: " + query);
      
      this.filterRestaurants(query);
    });
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;  // Set the selected filter
    this.filterOnChipsRestaurants();  // Filter based on the selected filter
  }

  filterOnChipsRestaurants(): void {
    if (this.selectedFilter === 'pureVeg') {
      this.filteredRestaurants = this.restaurantsList.filter(r => r.restaurantType === 'pure veg');
    } else if (this.selectedFilter === 'nonVeg') {
      this.filteredRestaurants = this.restaurantsList.filter(r => r.restaurantType === null);
    } else if (this.selectedFilter === 'rating') {
      this.filteredRestaurants = this.restaurantsList.filter(r => r.restaurantAvgRating >= 4.0);
    } else {
      this.filteredRestaurants = this.restaurantsList;  // Reset to show all if no filter is selected
    }
  }

  filterRestaurants(query: string) {
    this.filteredRestaurants = this.restaurantsList.filter((restaurant) =>
      restaurant.restaurantName.toLowerCase().includes(query.toLowerCase())
    );
  }

  getRestaurantDetails(restaurant: Restaurant) {
    this.menuService.getRestaurantById(restaurant)
  }

  getAllRestaurants() {
    this.restaurantsService.getRestaurants().subscribe(response => {
      this.restaurantsList = response
      this.filteredRestaurants = response;

      for(let i=0; i<this.restaurantsList.length; i++) {

        this.restaurantsService.getAvgRating(this.restaurantsList[i].restaurantId).subscribe(
          response => {
            this.restaurantsList[i].restaurantAvgRating = Math.round(response * 10) / 10;
          }
        )
      }
    },
      error => console.log("error" + JSON.stringify(error))
    )
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  
    for (let i = 0; i < fullStars; i++) {
      stars.push('fa fa-star');
    }
  
    if (halfStar) {
      stars.push('fa fa-star-half-alt');
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push('fa fa-star-o');
    }
  
    return stars;
  }
  

}
