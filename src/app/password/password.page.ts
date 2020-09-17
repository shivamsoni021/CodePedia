import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  show = false;
  constructor() { }

  ngOnInit() {
  }

  showPassword(){
    this.show = !this.show;
  }
}
