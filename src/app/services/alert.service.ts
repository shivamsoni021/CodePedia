import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private alertController: AlertController) { }

    async showAlert(headerMessage: string, message: string) {
        const alert = await this.alertController.create(
            { header: headerMessage, message, buttons: ['Okay'] }
        );
        alert.present();
    }
}
