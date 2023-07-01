import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from, generate } from 'rxjs';
import { AuthService } from '../auth.service';
import { PasswordManagerService } from '../password-manager.service';
import { User } from '../interfaces';

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.sass']
})
export class GeneratorComponent implements OnInit {
    @Input() fromPasswordModal: boolean = false;

    @Output() generation: EventEmitter<string> = new EventEmitter<string>();

    loading = false;

    user: User;

    generatedPassword: string = '';

    passwordLength = 16;

    options: GeneratorOptions[] = [
        {
            label: 'Lowercase (a-z)',
            value: 'isLowercase',
            checked: true,
            disabled: false,
        },
        {
            label: 'Uppercase (A-Z)',
            value: 'isUppercase',
            checked: true,
            disabled: false,
        },
        {
            label: 'Numbers (0-9)',
            value: 'isNumbers',
            checked: true,
            disabled: false,
        },
        {
            label: 'Symbols (!-$^+)',
            value: 'isSymbols',
            checked: true,
            disabled: false,
        },
    ];

    constructor(
        private auth: AuthService,
        private passwordManager: PasswordManagerService,
    ) { }

    ngOnInit(): void {
        this.loading = true;
        // check if user is logged in
        if (!this.fromPasswordModal) {
            this.auth.isLoggedIn().then((user: any) => {
                if (user) {
                    // get users from firestore
                    from(this.passwordManager.getUsers()).subscribe((users: User[]) => {
                        if (users) {
                            this.user = users.filter((u) => u.userId === user.uid)[0];
                            this.loading = false;
                        }
                    });
                }
            });
        } else {
            this.loading = false;
        }

        this.generatePassword();
    }

    generatePassword(): void {
        const characters: any = { // object of letters, numbers & symbols
            isLowercase: "abcdefghijklmnopqrstuvwxyz",
            isUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            isNumbers: "0123456789",
            isSymbols: "^!$%&|[](){}:;.,*+-#@<>~"
        }

        let staticPassword = '',
            randomPassword = '',
            checkedCheckboxes: string[] = [];

        this.options.forEach((option) => { // looping through each option's checkbox
            if (option.checked) { // if checkbox is checked
                // adding particular key value from character object to staticPassword
                staticPassword += characters[option.value];
                checkedCheckboxes.push(option.value);
            }
            if (checkedCheckboxes.length === 1) {
                // disable checkbox with value from checkedCheckboxes
                this.options.forEach((option) => {
                    if (option.value === checkedCheckboxes[0]) {
                        option.disabled = true;
                    }
                });
            } else {
                // enable all checkboxes
                this.options.forEach((option) => {
                    option.disabled = false;
                });
            }
        });

        for (let i = 0; i < this.passwordLength; i++) {
            // getting random character from the static password
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            randomPassword += randomChar; // adding random character to randomPassword
        }

        this.generatedPassword = randomPassword;
        this.generation.emit(this.generatedPassword);
    }

    copyToClipboard(event: Event, value: string): void {
        event.preventDefault();
        event.stopPropagation();

        navigator.clipboard.writeText(value);
    }
}

export interface GeneratorOptions {
    label: string;
    value: string;
    checked: boolean;
    disabled: boolean;
}
