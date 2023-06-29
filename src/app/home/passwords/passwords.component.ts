/// <reference types="chrome"/>

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Password, User } from 'src/app/interfaces';
import { PasswordManagerService } from 'src/app/password-manager.service';

@Component({
    selector: 'passwords',
    templateUrl: './passwords.component.html',
    styleUrls: ['./passwords.component.sass'],
    providers: [PasswordManagerService]
})
export class PasswordsComponent implements OnInit {
    @Input() passwords: Password[] = [];

    @Output() editPasswordModal: EventEmitter<Password> = new EventEmitter<Password>();

    loading: boolean = false;

    googlePagesUrls: string[] = [
        'https://accounts.google.com',
        'https://myaccount.google.com',
        'https://mail.google.com',
        'https://drive.google.com',
        'https://photos.google.com',
        'https://translate.google.com',
        'https://calendar.google.com',
        'https://news.google.com',
        'https://maps.google.com',
        'https://books.google.com',
        'https://google.com',
        'https://youtube.com',
        'https://music.youtube.com',
        'https://www.google.com',
        'https://www.youtube.com',
        'https://play.google.com',
        'https://podcasts.google.com',
        'https://meet.google.com',
        'https://contacts.google.com',
        'https://keep.google.com',
    ];
    microsoftPagesUrls: string[] = [
        'https://account.microsoft.com',
        'https://outlook.live.com',
        'https://onedrive.live.com',
        'https://office.live.com',
        'https://www.bing.com',
        'https://www.microsoft.com',
        'https://www.xbox.com',
        'https://www.skype.com',
        'https://www.msn.com',
        'https://microsoft.com',
        'https://microsoft.net',
        'https://www.microsoft.com',
        'https://www.microsoft.net',
    ];
    facebookPagesUrls: string[] = [
        'https://www.facebook.com',
        'https://www.messenger.com',
        'https://www.instagram.com',
        'https://www.whatsapp.com',
        'https://www.oculus.com',
        'https://www.workplace.com',
        'https://www.facebook.com',
    ];
    twitterPagesUrls: string[] = [
        'https://twitter.com',
        'https://www.periscope.tv',
    ];
    amazonPagesUrls: string[] = [
        'https://www.amazon.com',
        'https://www.amazon.com.br',
        'https://www.amazon.ca',
        'https://www.amazon.com.mx',
        'https://www.amazon.co.uk',
        'https://www.amazon.de',
        'https://www.amazon.es',
        'https://www.amazon.fr',
        'https://www.amazon.it',
    ];

    thisPagePasswords: Password[] = [];

    constructor(
        private passwordManager: PasswordManagerService
    ) { }

    ngOnInit(): void {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
            console.log(tabs);

            let origin = new URL(tabs[0].url).origin;
            let originGroup: string = '';

            if (this.googlePagesUrls.includes(origin)) {
                originGroup = 'google';
            } else if (this.microsoftPagesUrls.includes(origin)) {
                originGroup = 'microsoft';
            } else if (this.facebookPagesUrls.includes(origin)) {
                originGroup = 'facebook';
            } else if (this.twitterPagesUrls.includes(origin)) {
                originGroup = 'twitter';
            } else if (this.amazonPagesUrls.includes(origin)) {
                originGroup = 'amazon';
            } else {
                originGroup = 'other';
            }
            console.log('%c origin: ' + origin, 'color: #00ff00');

            this.thisPagePasswords = this.passwords.filter((password: Password) => {
                let passwordOrigin = password.url === 'localhost' ? 'http://' + password.url + ':4200' : new URL('https://' + password.url).origin;
                console.log('%c originPassword: ' + passwordOrigin, 'color: #00ff00');
                // check if origin is google, microsoft, facebook, twitter or amazon
                switch (originGroup) {
                    case 'google':
                        if (this.googlePagesUrls.includes(passwordOrigin.toString())) {
                            return true;
                        }
                        break;
                    case 'microsoft':
                        if (this.microsoftPagesUrls.includes(passwordOrigin.toString())) {
                            return true;
                        }
                        break;
                    case 'facebook':
                        if (this.facebookPagesUrls.includes(passwordOrigin.toString())) {
                            return true;
                        }
                        break;
                    case 'twitter':
                        if (this.twitterPagesUrls.includes(passwordOrigin.toString())) {
                            return true;
                        }
                        break;
                    case 'amazon':
                        if (this.amazonPagesUrls.includes(passwordOrigin.toString())) {
                            return true;
                        }
                        break;
                    case 'other':
                        // check if origin is the same as the current page
                        if (origin === passwordOrigin) {
                            return true;
                        }
                        break;
                }

                return false;
            });
        });
    }

    favicon(url: string): string {
        return `https://s2.googleusercontent.com/s2/favicons?domain=${encodeURIComponent(url)}`;
    }

    editPassword(password: Password): void {
        this.editPasswordModal.emit(password);
    }

    copyToClipboard(event: Event, value: string): void {
        event.preventDefault();
        event.stopPropagation();

        navigator.clipboard.writeText(value);
    }
}
