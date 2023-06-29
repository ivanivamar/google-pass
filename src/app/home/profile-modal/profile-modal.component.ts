import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/interfaces';

@Component({
    selector: 'app-profile-modal',
    templateUrl: './profile-modal.component.html',
    styleUrls: ['./profile-modal.component.sass'],
    providers: [AuthService]
})
export class ProfileModalComponent {
    @Input() user: User;

    showProfileModal: boolean = false;

    profileOptions: ProfileOption[] = [
        {
            title: 'Edit Profile',
            subtitle: 'Change your name, email, phone number, and more.',
            icon: 'edit',
            action: 'editProfile',
        },
        {
            title: 'Change Password',
            subtitle: 'Change your password.',
            icon: 'lock',
            action: 'changePassword',
        },
        {
            title: 'Two-Factor Authentication',
            subtitle: 'Enable two-factor authentication.',
            icon: 'lock',
            action: 'twoFactorAuthentication',
        },
        {
            title: 'Logout',
            subtitle: 'Logout from your account.',
            icon: 'logout',
            action: 'logout',
            danger: true,
        },
    ];

    constructor(
        private router: Router,
        private auth: AuthService,
    ) { }

    showOption(action: string) {
        switch (action) {
            case 'editProfile':
                console.log('editProfile');
                break;
            case 'changePassword':
                console.log('changePassword');
                break;
            case 'twoFactorAuthentication':
                console.log('twoFactorAuthentication');
                break;
            case 'logout':
                this.logout();
                break;
        }
    }

    logout(): void {
        this.auth.logout()
            .then(() => {
                this.router.navigate(['login']);
            }).catch((error) => {
                console.log('error', error);
            });
    }

}

export interface ProfileOption {
    title: string;
    subtitle: string;
    icon: string;
    action: string;
    danger?: boolean;
}
