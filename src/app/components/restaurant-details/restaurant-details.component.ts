import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent {

  restaurantId:number=0;

  isMenuActive : boolean = true

  constructor(private router: Router) {
    
   }

  enableReviews() {
    this.isMenuActive = false
  }

  enableMenu() {
    this.isMenuActive = true
  }
}
