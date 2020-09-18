import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  email:string;
  password:string;
  constructor() {  }

  ngOnInit() {
  }
  
  onClicked(){
    this.isClicked = true;
    console.log(this.isClicked);
    this.email = this.form.value['email'];
    console.log(this.email);
  }
  onclick(){
    console.log("worked!");
  }

  onSubmit(form: NgForm){ 
    
      this.password = this.form.value['password'];  
      
      console.log(this.password);

      
  }

  navigateBack() {
    this.isClicked = false;
  }
  showPassword(){
    this.show = !this.show;
  }
}
