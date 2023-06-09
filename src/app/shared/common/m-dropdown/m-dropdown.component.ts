import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IDropdownOption } from 'src/app/interfaces';

@Component({
    host: {
        '(document:click)': 'onClick($event)',
    },
    selector: 'm-dropdown',
    templateUrl: './m-dropdown.component.html',
    styleUrls: ['./m-dropdown.component.sass']
})
export class MDropdownComponent implements OnInit {
    @Input() options: IDropdownOption[] = [];
    @Input() placeholder: string = 'Select an Option';
    @Input() value: any = null;
    @Input() disabled: boolean = false;
    @Input() icon: string = '';
    @Input() showClear: boolean = false;
    @Input() returnValue: boolean = false;

    @Output() valueChange = new EventEmitter();

    expanded: boolean = false;
    ngModelLabel: string = '';

    constructor(private _eref: ElementRef) { }

    ngOnInit() {
        if (this.value) {
            console.log(this.value);
            this.options.forEach((item: IDropdownOption) => {
                if (item.value === this.value) {
                    item.selected = true;
                    this.ngModelLabel = item.label;
                }
            });
        }
    }


    onClick(event: Event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.expanded = false;
        } else {
            this.expanded = true;
        }
    }

    selectItem(option: IDropdownOption) {
        if (this.returnValue) {
            this.value = option.value;
        } else {
            this.value = option;
        }
        this.ngModelLabel = option.label;
        this.valueChange.emit(this.value);
        option.selected = true;

        this.options.forEach((item: IDropdownOption) => {
            if (item.value !== option.value) {
                item.selected = false;
            }
        });

        this.expanded = false;
    }

    clear(event: Event) {
        event.stopPropagation();
        this.value = null;
        this.ngModelLabel = '';
        this.options.forEach((item: IDropdownOption) => {
            item.selected = false;
        });
    }
}
