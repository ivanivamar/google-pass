import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note, Password } from 'src/app/interfaces';
import { HelperMethods } from 'src/app/shared/helper-methods';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.sass']
})
export class SearchComponent {
    @Input() passwords: Password[];
    @Input() notes: Note[];

    @Output() searchEdit: EventEmitter<SearchObject> = new EventEmitter<SearchObject>();

    showSearch = false;

    searchText: string = '';
    searchedPasswords: Password[] = [];
    searchedNotes: Note[] = [];

    private helpers: HelperMethods = new HelperMethods();

    search() {
        if (this.searchText === '') {
            this.searchedPasswords = [];
            this.searchedNotes = [];
            return;
        }

        // filter passwords by title if they have a title and url
        this.searchedPasswords = this.passwords.filter(password => {
            if (!this.helpers.isValueEmpty(password.title) && password.title?.toLowerCase().includes(this.searchText.toLowerCase())) {
                return true;
            }
            if (password.url.toLowerCase().includes(this.searchText.toLowerCase())) {
                return true;
            }
            return false;
        });
        this.searchedNotes = this.notes.filter(note => {
            return note.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
    }

    sendSearchEdit(type: string, data: any) {
        this.searchEdit.emit({
            type: type,
            data: data
        });
    }

    favicon(url: string): string {
        return `https://s2.googleusercontent.com/s2/favicons?domain=${encodeURIComponent(url)}`;
    }

    copyToClipboard(event: Event, value: string): void {
        event.preventDefault();
        event.stopPropagation();

        navigator.clipboard.writeText(value);
    }

    close(): void {
        this.showSearch = false;
        this.searchText = '';
        this.searchedPasswords = [];
        this.searchedNotes = [];
    }
}

export interface SearchObject {
    type: string;
    data: any;
}
