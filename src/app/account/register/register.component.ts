import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Register } from 'src/app/auth.service';
import { User } from 'src/app/interfaces';
import { PasswordManagerService } from 'src/app/password-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  providers: [AuthService, PasswordManagerService],
})
export class RegisterComponent {
    registerForm: Register = {
        username: '',
        email: '',
        password: '',
    };

    constructor(
        private auth: AuthService,
        private passwordManager: PasswordManagerService,
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

    register() {
        this.auth.register({
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password,
        }).then((user) => {
            console.log('user', user);
            // create user in firestore
            let newUser: User = {
                id: user.uid,
                username: this.registerForm.username,
                email: user.email,
                password: this.registerForm.password,
                image: '',
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString(),
                passwords: [],
                notes: [],
                creditCards: [],
                direction: [],
                phone: '',
                settings: [
                    {
                        theme: 'light',
                        userId: user.uid,
                    }
                ],
                userId: user.uid,
            };

            this.passwordManager.createUser(newUser)
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id);
                    this.router.navigate(['/auth/login']);
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                });
        }).catch((error) => {
            console.log('error', error);
        });
    }
}
