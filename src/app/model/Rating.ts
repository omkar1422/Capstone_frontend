export interface RatingOfRestaurantByCustomer {
    ratingId: number;
    rating: number;
    reviewText?: string; // Optional field
    customer: Customer;
    restaurant: Restaurant;
  }
  
  export interface Customer {
    customerId: number;
    customerName: string;
    customerEmail: string;
  }
  
  export interface Restaurant {
    restaurantId: number;
    restaurantName: string;
    restaurantAddress: string;
  }