import { Component } from '@angular/core';
import { PlacedOrder } from 'src/app/model/placed-order';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { PlacedOrderService } from 'src/app/services/placed-order/placed-order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orders!: PlacedOrder[] 
  orderHistory!: PlacedOrder[]

  constructor(public placedOrderService: PlacedOrderService, public authService: AuthService) {  }

  ngOnInit() {
    this.getOrderHistoryOfCustomer(this.authService.user.customerId);
  }
  
  getOrderHistoryOfCustomer(customerId: string) {
    // Ensure the orderHistory array is initialized before using it
    this.orderHistory = [];
  
    this.placedOrderService.getPlacedOrdersByCustomer(customerId).subscribe(
      response => {
        this.orders = response;
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].delivery === "Delivered") {
            this.orderHistory.push(this.orders[i]);
          }
        }
  
        console.log("this.orderHistory: ", this.orderHistory);
      },
      error => console.log("error: ", error)
    );
  }
  
}
