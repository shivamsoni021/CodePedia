import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Do you really want to <strong>logout?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.router.navigateByUrl('/signin');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

  onLogOut(){
    this.authService.logOut();
    this.presentAlert();
  }

}
