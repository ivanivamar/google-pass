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

    constructor(
        private passwordManager: PasswordManagerService
    ) { }

    ngOnInit(): void {
        console.log('this.password', this.password);
        this.title = this.password.id ? 'Edit Password' : 'Add Password';
    }

    save(): void {
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
}
