import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note, Password } from 'src/app/interfaces';

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

    search() {
        if (this.searchText === '') {
            this.searchedPasswords = [];
            this.searchedNotes = [];
            return;
        }

        this.searchedPasswords = this.passwords.filter(password => {
            return password.url.toLowerCase().includes(this.searchText.toLowerCase());
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
