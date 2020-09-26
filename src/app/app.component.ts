import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { AuthService } from 'src/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storageService: StorageService,
        private authService: AuthService,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        this.checkForAutoLogin();
    }

    /**
     * This method is used for checking whether user can automatically logged in or not
     */
    async checkForAutoLogin() {
        try {
            const userCred = await this.storageService.getUserDetailsFromStorage();
            if (userCred) {
                this.authService.login(userCred.username, userCred.password).subscribe(res => {
                    this.authService.setUserId(res.localId);
                    this.router.navigate(['/tabs']);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
}
