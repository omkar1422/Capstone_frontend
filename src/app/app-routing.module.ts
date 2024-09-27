import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/authentication/auth.service';
import { MenuComponent } from './components/menu/menu.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { CartComponent } from './components/cart/cart.component';
import { PlacedOrdersComponent } from './components/placed-orders/placed-orders.component';
import { AddressComponent } from './components/address/address.component';
import { ManageNotificationsComponent } from './components/manage-notifications/manage-notifications.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

export const profileGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canActivate()
}

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "signin",
    component: SignInComponent,
    // canActivate: [profileGuard]
  },
  {
    path: "signup",
    component: SignUpComponent,
    // canActivate: [profileGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [profileGuard],
    children: [
      { path: 'manage-orders', component: PlacedOrdersComponent },
      { path: 'address', component: AddressComponent },
      { path: 'manage-notifications', component: ManageNotificationsComponent },
      { path: 'faqs', component: FaqsComponent },
      { path: 'order-history', component: OrderHistoryComponent},
      { path: '', redirectTo: 'manage-orders', pathMatch: 'full' }  // Default route
    ]
  },
  {
    path: "restaurantDetails/:restaurantId/menu",
    component: MenuComponent
  },
  {
    path: "restaurantDetails/:restaurantId",
    component: RestaurantDetailsComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "placed-orders",
    component: PlacedOrdersComponent
  },
  {
    path: "restaurantDetails/:restaurantId/reviews",
    component: ReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
