import { Component } from '@angular/core';
import { PlacedOrder } from 'src/app/model/placed-order';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { PlacedOrderService } from 'src/app/services/placed-order/placed-order.service';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.css']
})
export class PlacedOrdersComponent {

  orders!: PlacedOrder[]
  placedOrders!: PlacedOrder[]

  constructor(public placedOrderService: PlacedOrderService, public authService: AuthService) {}

  ngOnInit() {
    this.getPlacedOrdersByCustomer()
  }

  getPlacedOrdersByCustomer() {
    this.placedOrders = []

    this.placedOrderService.getPlacedOrdersByCustomer(this.authService.user.customerId).subscribe(
      response => {
        this.orders = response
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].delivery === "Pending") {
            this.placedOrders.push(this.orders[i]);
          }
        }
      },
      error => console.log("Error: " + error)
      
    )
  }
}
