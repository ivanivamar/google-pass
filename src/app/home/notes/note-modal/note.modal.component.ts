import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropdownOption, Note } from 'src/app/interfaces';
import { Tab } from 'src/app/shared/common/tabs/tabs.component';

@Component({
    selector: 'note-modal',
    templateUrl: 'note.modal.component.html',
    styleUrls: ['note.modal.component.sass']
})
export class NoteModalComponent implements OnInit {
    @Input() note: Note = {} as Note;

    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() saveNote: EventEmitter<Note> = new EventEmitter<Note>();
    @Output() deleteNote: EventEmitter<Note> = new EventEmitter<Note>();

    title: string = 'Add Note';
    showNote: boolean = false;
    showMore: boolean = false;

    notesTabs: Tab[] = [
        {
            label: 'Details',
            code: 'details',
            active: true,
        },
        {
            label: 'Settings',
            code: 'settings',
            active: false,
        },
    ];
    tab: string = 'details';

    notesColors: IDropdownOption[] = [
        {
            value: '#4B95E9',
            label: 'Blue',
            selected: true,
        },
        {
            value: '#F5A623',
            label: 'Orange',
        },
        {
            value: '#F8E71C',
            label: 'Yellow',
        },
        {
            value: '#7ED321',
            label: 'Green',
        },
        {
            value: '#9013FE',
            label: 'Purple',
        },
        {
            value: '#D0021B',
            label: 'Red',
        },
    ];

    showColors: boolean = false;

    ngOnInit(): void {
        console.log('this.note', this.note);
        this.title = this.note.id ? 'Edit Note' : 'Add Note';

        this.note.color = this.note.color || '#EFEFEF';
    }

    save(): void {
        this.saveNote.emit(this.note);
    }

    delete(): void {
        this.deleteNote.emit(this.note);
    }

    closeModal() {
        if (this.note.id) {
            this.note.updatedAt = new Date().toUTCString();
        }
        this.close.emit();
    }
}
