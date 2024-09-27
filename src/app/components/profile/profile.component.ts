import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { PlacedOrderService } from 'src/app/services/placed-order/placed-order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  customerName : string = ''

  constructor(public authService: AuthService) {}

  getInitials(name: string): string {
    if (!name) return '?';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials.length > 2 ? initials.substring(0, 2) : initials;
  }
}
