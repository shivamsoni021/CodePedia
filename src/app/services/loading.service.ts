import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(public loadingController: LoadingController) { }

    async showHideAutoLoader() {
        const loading = await this.loadingController.create({
            message: 'This Loader Will Auto Hide in 2 Seconds',
            duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
    }

    showLoader() {

        this.loadingController.create({
            // message: 'Loadind data',
            spinner: 'bubbles'
        }).then((res) => {
            res.present();
        });

    }

    // Hide the loader if already created otherwise return error
    async hideLoader() {

        this.loadingController.dismiss().then((res) => {
            console.log('Loading dismissed!', res);
        }).catch((error) => {
            console.log('error', error);
        });

    }
}
