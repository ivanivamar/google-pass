import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './interfaces';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    providers: [AuthService],
})
export class AppComponent implements OnInit {
    title = 'google-pass';

    user: User;
    constructor(
        private auth: AuthService,
    ) { }

    ngOnInit(): void {
        // check if user is logged in
        this.auth.isLoggedIn().then((user: any) => {
            if (user) {
                console.log('user is logged in', user);
                this.user = user;
            }
        });
    }
}
