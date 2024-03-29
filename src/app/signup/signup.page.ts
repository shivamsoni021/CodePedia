import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';
import { LOGIN_ERROR_CODES } from '../constants/app.constants';
import { AlertService } from '../services/alert.service';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    @ViewChild('f') form: NgForm;

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

    onClicked() {
        this.isClicked = true;
        this.email = this.form.value.email;
    }

    navigateToHomePage() {
        this.router.navigate(['/tabs']);
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        this.password = this.form.value.password;

        this.loadingController.create({ keyboardClose: true, message: 'Registering' })
            .then(loadingEl => {

                loadingEl.present();

                this.authService.signup(this.email, this.password).subscribe(resData => {
                    this.isLoading = false;
                    loadingEl.dismiss();

                    this.authService.pushData(this.email, resData.localId).subscribe(() => { });
                    this.storageService.setUserdetailsToStorage({ username: this.email, password: this.password });
                    this.navigateToHomePage();

                },
                    errorRes => {
                        this.isLoading = false;
                        loadingEl.dismiss();
                        const code = errorRes.error.error.message;
                        let message = 'Could not Sign you in ! Please try again!!';

                        if (code === LOGIN_ERROR_CODES.EMAIL_EXISTS) {
                            message = 'This email is already registered yet!';
                        }
                        this.alertService.showAlert('Authentication Failed', message);
                    });
            });

    }

    navigateBack() {
        this.isClicked = false;
    }

    showPassword() {
        this.show = !this.show;
    }

}
