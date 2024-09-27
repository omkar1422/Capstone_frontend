import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewReview } from 'src/app/model/new-review';
import { RatingOfRestaurantByCustomer } from 'src/app/model/Rating';
import { Restaurant } from 'src/app/model/restaurant';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RestaurantsService } from 'src/app/services/home/restaurants.service';
import { MenuCartService } from 'src/app/services/menu-cart/menu-cart.service';
import { ReviewsRatingsService } from 'src/app/services/reviewsAndRatings/reviews-ratings.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  averageRating!: number
  totalReviews !: number
  restaurantId: number = 0
  restaurantsList!: Restaurant[]

  newReviewText: string = '';
  newRating: number = 0;

  stars: number[] = [1,2,3,4,5];

  ratings : RatingOfRestaurantByCustomer[] = []
 
  selectedRating: number = 0;
  hoveredRating: number = 0;

  reviewText: string = '';

  newReview !: NewReview

  restaurant !: Restaurant | null
 
  constructor(public authService: AuthService, public restaurantsService: RestaurantsService, public menuService: MenuCartService,
     public activatedRoute: ActivatedRoute, public reviewsService: ReviewsRatingsService) {

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('restaurantId')) {
        this.restaurantId = params.get('restaurantId') ? Number(params.get('restaurantId')) : 0;
      }
    })
  }

  ngOnInit() {
    this.getAvgRating()
    this.getAllRatings()
    this.getRestaurantById(this.restaurantId.toString())
  }

  getRestaurantById(restaurantId: string) {
    this.restaurantsService.getRestaurantById(restaurantId).subscribe(
      response => {
        this.restaurant = response
        console.log("restaurant: " + this.restaurant);
        
      },
      error => {
        console.log("error: " + JSON.stringify(error))
      }
    )
  }

  submitReview(): void {

    this.newReview = {
      customer: {
        customerId: 0 // or any default value
      },
      restaurant: {
        restaurantId: 0 // or any default value
      },
      rating: 0,
      reviewText: ''
    };

    this.newReview.rating = this.selectedRating
    this.newReview.reviewText = this.reviewText

    console.log("this.selectedRating: " + this.selectedRating);
    console.log("this.newReviewText.trim(): " + this.reviewText.trim());

    if (this.selectedRating === 0 || this.reviewText.trim() === '') {
      // You can show a message to the user to fill out all required fields

      alert('Please select a rating and write a review.');
      return;
    }

    this.newReview.customer.customerId = Number(this.authService.user.customerId)
    this.newReview.restaurant.restaurantId = Number(this.restaurantId.toString())

    console.log("newReview: " + JSON.stringify(this.newReview))

    this.reviewsService.saveReviewAndRating(this.newReview).subscribe(
      response => {
        console.log('Review submitted successfully', response);
        this.resetForm();
      },
      error => {
        // Handle error
        console.error('Error submitting review', error);
      }
    );
  }

  // Reset the form fields after successful submission
  resetForm(): void {
    // this.newReview = new NewReview();
    this.newReview.customer = { customerId: 0 }; // Default values
    this.newReview.restaurant = { restaurantId: 0 };
  }

  getInitials(name: string): string {
    if (!name) return '?';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials.length > 2 ? initials.substring(0, 2) : initials;
  }

  ratingBreakdown = [
    { stars: 5, percentage: 0 },
    { stars: 4, percentage: 0 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 }
  ];
  
  getAllRatings() {
    this.restaurantsService.getAllRatings(this.restaurantId).subscribe(
      response => {
        this.ratings = response;

        const totalRatings = this.ratings.length;
  
        if (totalRatings > 0) {
          // Count the number of ratings for each star level
          const ratingCounts = {
            1: this.ratings.filter(r => r.rating >= 1 && r.rating < 2).length,
            2: this.ratings.filter(r => r.rating >= 2 && r.rating < 3).length,
            3: this.ratings.filter(r => r.rating >= 3 && r.rating < 4).length,
            4: this.ratings.filter(r => r.rating >= 4 && r.rating < 5).length,
            5: this.ratings.filter(r => r.rating === 5).length
          };
  
          // Update the ratingBreakdown with percentages
          this.ratingBreakdown = [
            { stars: 5, percentage: (ratingCounts[5] / totalRatings) * 100 },
            { stars: 4, percentage: (ratingCounts[4] / totalRatings) * 100 },
            { stars: 3, percentage: (ratingCounts[3] / totalRatings) * 100 },
            { stars: 2, percentage: (ratingCounts[2] / totalRatings) * 100 },
            { stars: 1, percentage: (ratingCounts[1] / totalRatings) * 100 }
          ];
        } else {
          // Handle case where there are no ratings
          this.ratingBreakdown = [
            { stars: 5, percentage: 0 },
            { stars: 4, percentage: 0 },
            { stars: 3, percentage: 0 },
            { stars: 2, percentage: 0 },
            { stars: 1, percentage: 0 }
          ];
        }
  
        console.log("Rating breakdown: ", this.ratingBreakdown);
      },
      error => {
        console.log("Error fetching ratings: ", error);
      }
    );
  }
  

  getAvgRating() {
    this.restaurantsService.getAvgRating(this.restaurantId.toString()).subscribe(
      response => {
        console.log("avgRating: " + response);

        this.averageRating = Math.round(response * 10) / 10;
      }
    )
  }

  getStarRatingClass(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = Array(fullStars).fill('full-star');

    if (hasHalfStar) {
      stars.push('half-star');
    }

    return stars;
  }

  hoverRating(rating: number): void {
    this.hoveredRating = rating;
  }
  
  selectRating(rating: number): void {
    this.selectedRating = rating;
  }
}
