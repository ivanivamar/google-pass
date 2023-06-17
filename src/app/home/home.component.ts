import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { PasswordManagerService } from '../password-manager.service';
import { CreditCard, Note, Password, User } from '../interfaces';
import { from } from 'rxjs';
import { Tab } from '../shared/common/tabs/tabs.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    providers: [AuthService, PasswordManagerService]
})
export class HomeComponent {
    loading: boolean = false;
    user: User = {} as User;
    showUserMenu: boolean = false;

    homeTabs: Tab[] = [
        {
            label: 'Passwords',
            code: 'passwords',
            active: true,
        },
        {
            label: 'Secure Notes',
            code: 'notes',
            active: false,
        },
        {
            label: 'Payments',
            code: 'payments',
            active: false,
        },
    ];
    tab: string = 'passwords';

    showPasswordModal: boolean = false;
    password: Password = {} as Password;
    passwordsBackup: Password[] = [];

    showNoteModal: boolean = false;
    note: Note = {} as Note;
    notesBackup: Note[] = [];

    showPaymentModal: boolean = false;
    payment: CreditCard = {} as CreditCard;
    paymentsBackup: CreditCard[] = [];

    searchText: string = '';
    showSearch: boolean = false;

    showOrderPasswordsMenu: boolean = false;
    orderBy: string = 'updatedAt';

    constructor(
        private auth: AuthService,
        private passwordManager: PasswordManagerService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.loading = true;
        // check if user is logged in
        this.auth.isLoggedIn().then((user: any) => {
            if (user) {
                // get users from firestore
                from(this.passwordManager.getUsers()).subscribe((users: User[]) => {
                    if (users) {
                        this.user = users.filter((u) => u.userId === user.uid)[0];
                        this.loading = false;

                        this.passwordsBackup = JSON.parse(JSON.stringify(this.user.passwords));
                        this.orderPasswordsBy('updatedAt');

                        this.notesBackup = JSON.parse(JSON.stringify(this.user.notes));
                    }
                });
            }
        });
    }

    editProfile(): void {
        this.showUserMenu = false;
        // navigate to profile page
        this.router.navigate(['profile']);
    }

    logout(): void {
        this.showUserMenu = false;

        this.auth.logout()
            .then(() => {
                this.router.navigate(['']);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }).catch((error) => {
                console.log('error', error);
            });
    }

    create() {
        switch (this.tab) {
            case 'passwords':
                this.showPasswordModal = true;
                break;
            case 'notes':
                this.showNoteModal = true;
                break;
            case 'payments':
                this.showPaymentModal = true;
                break;
        }
    }

    editPassword(password: Password): void {
        this.password = password;
        this.showPasswordModal = true;
    }

    editNote(note: Note): void {
        this.note = note;
        this.showNoteModal = true;
    }

    savePassword(password: Password): void {
        if (!this.user.passwords) {
            this.user.passwords = [];
        }

        if (!password.id) {
            password.id = this.idGenerator();
            password.createdAt = new Date().toUTCString();
            password.updatedAt = new Date().toUTCString();
            this.user.passwords.push(password);
        } else {
            const index = this.user.passwords.findIndex((p) => p.id === password.id);
            password.updatedAt = new Date().toUTCString();
            this.user.passwords[index] = password;
        }

        this.passwordManager.updateUser(this.user);
        this.showPasswordModal = false;
        this.password = {} as Password;
        this.orderPasswordsBy('updatedAt');
    }

    saveNote(note: Note): void {
        if (!this.user.notes) {
            this.user.notes = [];
        }

        if (!note.id) {
            note.id = this.idGenerator();
            note.createdAt = new Date().toUTCString();
            note.updatedAt = new Date().toUTCString();
            this.user.notes.push(note);
        } else {
            const index = this.user.notes.findIndex((n) => n.id === note.id);
            note.updatedAt = new Date().toUTCString();
            this.user.notes[index] = note;
        }

        this.passwordManager.updateUser(this.user);
        this.showNoteModal = false;
        this.note = {} as Note;
    }

    deletePassword(password: Password): void {
        const index = this.user.passwords.findIndex((p) => p.id === password.id);
        this.user.passwords.splice(index, 1);
        this.passwordManager.updateUser(this.user);
        this.showPasswordModal = false;
        this.password = {} as Password;
        this.orderPasswordsBy('updatedAt');
    }

    deleteNote(note: Note): void {
        const index = this.user.notes.findIndex((n) => n.id === note.id);
        this.user.notes.splice(index, 1);
        this.passwordManager.updateUser(this.user);
        this.showNoteModal = false;
        this.note = {} as Note;
    }

    closePassword(): void {
        this.passwordManager.updateUser(this.user);
        this.showPasswordModal = false;
        this.password = {} as Password;
        this.orderPasswordsBy('updatedAt');
    }

    closeNote(): void {
        this.passwordManager.updateUser(this.user);
        this.showNoteModal = false;
        this.note = {} as Note;
    }

    orderPasswordsBy(field: string): void {
        // updatedAt or createdAt
        if (this.passwordsBackup.length === 0) {
            return;
        }
        this.orderBy = field;

        if (field === 'updatedAt' || field === 'url') {
            this.passwordsBackup = this.user.passwords.sort((a, b) => {
                if (a[field] < b[field]) {
                    return 1;
                }
                if (a[field] > b[field]) {
                    return -1;
                }
                return 0;
            });
            if (field === 'url') {
                this.passwordsBackup.reverse();
            }
        }
    }

    search(): void {
        if (this.searchText === null || this.searchText === '') {
            this.passwordsBackup = this.user.passwords;
            return;
        }

        switch (this.tab) {
            case 'passwords':
                // filter passwords
                this.passwordsBackup = this.user.passwords.filter((p) => {
                    return p.url.toLowerCase().includes(this.searchText.toLowerCase());
                });
                break;
            case 'notes':
                // filter notes
                this.notesBackup = this.user.notes.filter((n) => {
                    return n.name.toLowerCase().includes(this.searchText.toLowerCase());
                });
                break;
            case 'payments':
                // filter payments
                break;
        }
    }

    private idGenerator(): string {
        // composed by letters and numbers
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 20; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
