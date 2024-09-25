
export class NewReview {

    customer !: {
        customerId: number;
      };
      restaurant !: {
        restaurantId: number;
      };
      rating !: number;
      reviewText !: string;
    
    //   constructor(customerId: string, restaurantId: string, rating: string, reviewText: string) {
    //     this.customer = {
    //       customerId: Number(customerId)
    //     };
    //     this.restaurant = {
    //       restaurantId: Number(restaurantId)
    //     };
    //     this.rating = Number(rating)
    //     this.reviewText = reviewText;
    //   }
}