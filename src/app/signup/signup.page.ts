import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService, AuthResponseData } from '../../auth/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    isLoading = false;
    show = false;
    isClicked: boolean = false;
    @ViewChild('f') form: NgForm;
    email: string;
    password: string;
    constructor(private authService: AuthService,
        private loadingController: LoadingController,
        private alertDialog: AlertController,
        private router: Router
    ) {

    }

    ngOnInit() {

    }

    onClicked() {
        this.isClicked = true;
        console.log(this.isClicked);
        this.email = this.form.value['email'];
        console.log(this.email);
    }

    navigateToHomePage() {
        this.router.navigate(['/tabs/tab-nav']);
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        this.password = this.form.value['password'];

        this.loadingController.create({ keyboardClose: true, message: 'Registering' })
            .then(loadingEl => {

                loadingEl.present();

                this.authService.signup(this.email, this.password).subscribe(resData => {
                    this.isLoading = false;
                    loadingEl.dismiss();

                    this.navigateToHomePage();

                },
                    errorRes => {
                        this.isLoading = false;
                        loadingEl.dismiss();
                        const code = errorRes.error.error.message;
                        let message = "Could not Sign you in ! Please try again!!";

                        if (code === 'EMAIL_EXISTS') {
                            message = 'This email is already registered yet!';
                        }
                        this.showAlert(message);
                    });
            });
    }

    navigateBack() {
        this.isClicked = false;
    }
    showPassword() {
        this.show = !this.show;
    }

    private showAlert(message: string) {
        this.alertDialog.create({ header: "Authentication Failed", message: message, buttons: ['Okay'] }).then(alertEl => alertEl.present());
    }

}
