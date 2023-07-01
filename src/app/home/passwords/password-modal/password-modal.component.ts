import { Form, HelperMethods } from './../../../shared/helper-methods';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Password } from 'src/app/interfaces';
import { PasswordManagerService } from 'src/app/password-manager.service';

@Component({
    selector: 'password-modal',
    templateUrl: './password-modal.component.html',
    styleUrls: ['./password-modal.component.sass'],
    providers: [PasswordManagerService]
})
export class PasswordModalComponent implements OnInit {
    @Input() password: Password = {} as Password;

    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() savePassword: EventEmitter<Password> = new EventEmitter<Password>();
    @Output() deletePassword: EventEmitter<Password> = new EventEmitter<Password>();

    title: string = 'Add Password';
    showPassword: boolean = false;

    showGenerator: boolean = false;

    invalidUrl: string = '';
    invalidUsername: string = '';
    invalidPassword: string = '';

    private helpers: HelperMethods = new HelperMethods();

    constructor(
        private passwordManager: PasswordManagerService
    ) { }

    ngOnInit(): void {
        console.log('this.password', this.password);
        this.title = this.password.id ? 'Edit Password' : 'Add Password';
    }

    save(): void {
        let form: Form[] = [
            {
                name: 'name',
                value: this.password.url,
                invalid: false,
            },
            {
                name: 'username',
                value: this.password.username,
                invalid: false,
            },
            {
                name: 'password',
                value: this.password.password,
                invalid: false,
            },
        ];

        if (!this.helpers.validateForm(form)) {
            form.forEach((element: any) => {
                let name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
                if (element.invalid) {
                    this.invalidUrl = element.name === 'url' ? `${name} is required` : '';
                    this.invalidUsername = element.name === 'username' ? `${name} is required` : '';
                    this.invalidPassword = element.name === 'password' ? `${name} is required` : '';
                }
            });

            return;
        }

        this.savePassword.emit(this.password);
    }

    delete(): void {
        this.deletePassword.emit(this.password);
    }

    closeModal() {
        if (this.password.id) {
            this.password.updatedAt = new Date().toUTCString();
        }
        this.close.emit();
    }

    getFavicon(url: string): string {
        return `https://s2.googleusercontent.com/s2/favicons?domain=${encodeURIComponent(url)}`;
    }
}
