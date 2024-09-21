import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  averageRating = 3.9;
  totalReviews = 500;

  ratingBreakdown = [
    { stars: 5, percentage: 60 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 5 },
    { stars: 1, percentage: 5 },
  ];

  reviews = [
    {
      customerName: 'Deliveroo customer',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Was nice and hot when it was received, hotter than when we go in store!',
      avatarColor: '#E23745',
      customerInitial: 'D'
    },
    {
      customerName: 'Deliveroo customer',
      rating: 5,
      date: '4 weeks ago',
      comment: 'Once again everything that was ordered got delivered! They\'re getting good!',
      avatarColor: '#E23745',
      customerInitial: 'D'
    }
  ];

  getStarRatingClass(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = Array(fullStars).fill('full-star');

    if (hasHalfStar) {
      stars.push('half-star');
    }

    return stars;
  }
}
