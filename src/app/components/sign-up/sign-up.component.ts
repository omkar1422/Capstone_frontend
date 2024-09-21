import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  @ViewChild('signUpForm') signUpForm!: NgForm;

  user: User

  constructor(public authService: AuthService) {
    this.user = new User()
  }

  ngOnInit() {
    console.log("inside init")
  }

  signUpOnSubmit(signUpForm: any) {

    this.user = this.signUpForm.value

    console.log("user: ", this.user)

    this.authService.saveCustomer(this.user).subscribe(response => {
      console.log(response);
    },
    error => console.log(error) 
  )
    this.user = new User()
    signUpForm.form.markAsPristine()
  }
}
