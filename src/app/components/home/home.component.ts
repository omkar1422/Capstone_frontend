import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantsService } from 'src/app/services/home/restaurants.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatTabsModule, CommonModule]
})
export class HomeComponent {

  restaurantsList!: Restaurant[]

  constructor(public restaurantsService: RestaurantsService, public menuService: MenuCartService) { }

  ngOnInit() {
    console.log("inside ngOnInit");
  
    this.getAllRestaurants()
  }

  getRestaurantDetails(restaurant: Restaurant) {

    this.menuService.getRestaurantById(restaurant.restaurantId)
  }

  getAllRestaurants() {
    this.restaurantsService.getRestaurants().subscribe(response => {
      this.restaurantsList = response

      for(let i=0; i<this.restaurantsList.length; i++) {

        this.restaurantsService.getAvgRating(this.restaurantsList[i].restaurantId).subscribe(
          response => {
            console.log("avgRating: " + response);
            
            this.restaurantsList[i].restaurantAvgRating = response
          }
        )
      }
    },
      error => console.log("error" + JSON.stringify(error))
    )
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 !== 0; // Whether there's a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Number of empty stars
  
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('fa fa-star');
    }
  
    // Add half star if applicable
    if (halfStar) {
      stars.push('fa fa-star-half-alt');
    }
  
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push('fa fa-star-o');
    }
  
    return stars;
  }
  

}
