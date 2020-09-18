import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/auth.user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  show = false;
  isClicked: boolean = false;
  @ViewChild('f') form: NgForm;
  email: string;
  password: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onClicked() {
    this.isClicked = true;
    console.log(this.isClicked);
    this.email = this.form.value['email'];
    console.log(this.email);
  }
  onclick() {
    console.log("worked!");
  }

  onSubmit(form: NgForm) {

    this.password = this.form.value['password'];

    this.authService.signup(this.email, this.password).subscribe(resData => {
      console.log(resData);
    });
 


  }

  navigateBack() {
    this.isClicked = false;
  }
  showPassword() {
    this.show = !this.show;
  }
}
