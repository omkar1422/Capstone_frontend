import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/model/login-user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isCustomerLoggedIn!: boolean
  user: LoginUser

  constructor(public httpClient: HttpClient, public router: Router) {
    this.user = new LoginUser()
  }

  canActivate(): boolean {
    console.log()
    if (this.isCustomerLoggedIn && this.user.jwt !== null)
      return true
    return false
  }

  saveCustomer(user: any): Observable<any> {
    const url = "http://localhost:8080/restaurantListings/api/customer/register";
    return this.httpClient.post<any>(url, user)
  }

  // loginCustomer(user: any): Observable<any> {
  //   const url = "http://localhost:8080/restaurantListings/api/customer/login"
  //   return this.httpClient.post<any>(url, user)
  // }

  loginCustomer(user: any) {
    const url = "http://localhost:8080/restaurantListings/api/customer/login"
    this.httpClient.post<any>(url, user).subscribe(response => {
 
      this.isCustomerLoggedIn = true
      this.user = response.customer
      this.user.jwt = response.jwt

      var storedUser: any = {}
      Object.assign(storedUser, this.user)
      storedUser.password = user.password
      console.log(storedUser)
      localStorage.setItem('currentUser', JSON.stringify(storedUser));

      console.log("response.customer: " + JSON.stringify(response.customer))

      Swal.fire({
        title: 'Logged In Successfully!',
        // text: '',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      this.router.navigate(['/'])
    },
    error => {
      console.log(error)

      Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }

    )
  }

  logoutCustomer() {
    // Remove the current user from local storage
    localStorage.removeItem('currentUser');
    
    // Reset the user and authentication state
    this.isCustomerLoggedIn = false;
    // this.user = null;
  
    // Navigate the user to the login page or another desired route
    this.router.navigate(['/login']);
  }
}
