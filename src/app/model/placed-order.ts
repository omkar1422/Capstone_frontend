export interface Menu {
    menuName: string;
    menuPrice: number;
    menuImage: string;
    restaurant: Restaurant;
    menuId: number;
  }
  
  export interface Restaurant {
    restaurantAddress: string;
    restaurantName: string;
    restaurantEmail: string;
    restaurantId: number;
    restaurantPhone: string;
  }
  
  export interface PlacedOrder {
    menu: Menu;
    placedOrderPrice: number;
    placedOrderQty: number;
    placedOrderId: number;
    delivery: string;
  }