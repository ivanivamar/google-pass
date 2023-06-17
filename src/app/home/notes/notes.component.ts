import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/interfaces';

@Component({
    selector: 'notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.sass']
})
export class NotesComponent {
    @Input() notes: Note[] = [];

    @Output() editNoteModal: EventEmitter<Note> = new EventEmitter<Note>();

    loading: boolean = false;

    editNote(note: Note): void {
        this.editNoteModal.emit(note);
    }
}
