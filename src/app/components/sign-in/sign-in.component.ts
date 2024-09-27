import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/model/login-user';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MessageService } from 'primeng/api';

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

  signInOnSubmit(signInForm: any) {
    console.log("signInForm.form.value: " + signInForm.form.value);

    this.authService.loginCustomer(signInForm.form.value)
  }


}
