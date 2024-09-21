import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { PlacedOrderService } from 'src/app/services/placed-order/placed-order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(public authService: AuthService) {}


}
