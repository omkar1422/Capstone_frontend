import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/model/login-user';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  @ViewChild('signInForm') signInForm!: NgForm;

  user: LoginUser

  constructor(public authService: AuthService) {
   this.user = new LoginUser() 
  }

  // signInOnSubmit(signInForm: any) {
  //   console.log("this.signInForm.value: " + this.signInForm.value)
  //   this.user = this.signInForm.value
  //   console.log("user " + JSON.stringify(this.user))

  //     this.authService.loginCustomer(this.user).subscribe(response => {
  //       console.log(response)
  //       this.authService.isCustomerLoggedIn = true
  //     },
  //     error => console.log(error)
  //   )
  //   this.user = new User() 
  //   this.signInForm.form.markAsPristine
  // }

  
  signInOnSubmit(signInForm: any) {
    console.log("signInForm.form.value: " + signInForm.form.value);
    
    this.authService.loginCustomer(signInForm.form.value)
  }
}
