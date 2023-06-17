import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Password, User } from 'src/app/interfaces';
import { PasswordManagerService } from 'src/app/password-manager.service';

@Component({
    selector: 'passwords',
    templateUrl: './passwords.component.html',
    styleUrls: ['./passwords.component.sass'],
    providers: [PasswordManagerService]
})
export class PasswordsComponent {
    @Input() passwords: Password[] = [];

    @Output() editPasswordModal: EventEmitter<Password> = new EventEmitter<Password>();

    loading: boolean = false;

    constructor(
        private passwordManager: PasswordManagerService
    ) {}

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
