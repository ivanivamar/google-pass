import { Component,OnInit } from '@angular/core';
import { AuthService, Login } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
    providers: [AuthService],
})
export class LoginComponent implements OnInit {
    loginForm: Login = {
        email: '',
        password: '',
    };

    constructor(
        private auth: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        // check if user is logged in
        this.auth.isLoggedIn().then((user: any) => {
            if (user) {
                this.router.navigate(['']);
            }
        });
    }

    login() {
        this.auth.login({
            email: this.loginForm.email,
            password: this.loginForm.password,
        }).then((user) => {
            console.log('user', user);
            this.router.navigate(['']);
        }).catch((error) => {
            console.log('error', error);
        });
    }

    loginWithGoogle() {
        this.auth.googleLogin().then((user) => {
            console.log('user', user);
            this.router.navigate(['']);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }).catch((error) => {
            console.log('error', error);
        });
    }
}
