import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AuthResponseData } from '../../auth/auth.service';
import { AlertService } from '../services/alert.service';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
    @ViewChild('f') form: NgForm;
    auth = 'fs';
    isLoading = false;
    show = false;
    isClicked = false;
    email: string;
    password: string;

    constructor(
        private authService: AuthService,
        private loadingController: LoadingController,
        private router: Router,
        private alertService: AlertService,
        private storageService: StorageService
    ) { }

    ngOnInit() { }


    navigateToHomePage() {
        this.router.navigate(['/tabs']);
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;

        this.loadingController.create({ keyboardClose: true, message: 'Logging in..' })
            .then(loadingEl => {

                loadingEl.present();

                let authObs: Observable<AuthResponseData>;
                authObs = this.authService.login(this.email, this.password);
                authObs.subscribe(resData => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    this.authService.setUserId(resData.localId);
                    console.log(resData.localId);
                    this.storageService.setUserdetailsToStorage({username: this.email, password: this.password});
                    this.authService.getData('sfsa').subscribe(() => { });
                    this.navigateToHomePage();
                },
                    errorRes => {
                        this.isLoading = false;
                        loadingEl.dismiss();
                        const code = errorRes.error.error.message;

                        let message = 'Could not Sign you in ! Please try again!!';

                        if (code === 'EMAIL_NOT_FOUND') {
                            message = 'This email is not registered yet';
                        }
                        else if (code === 'INVALID_PASSWORD') {
                            message = 'Incorrect Password';
                        }
                        // this.showAlert(message);
                        this.alertService.showAlert('Authentication Failed', message);
                    });

            });

        this.email = this.form.value.email;
        this.password = this.form.value.password;
    }

    navigateBack() {
        this.isClicked = false;
    }

    showPassword() {
        this.show = !this.show;
    }


}
