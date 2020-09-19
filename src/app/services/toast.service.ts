import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private toastController: ToastController
    ) { }

    public async showToast(message: string, type: string, headerText?: string): Promise<any> {
        const toast = await this.toastController.create({
            header: headerText ? headerText : '',
            message,
            cssClass: 'frenzi-toast',
            duration: 3 * 1000,
            color: type
        });
        toast.present();
    }
}
