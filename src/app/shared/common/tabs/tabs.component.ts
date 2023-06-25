import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.sass']
})
export class TabsComponent {
    @Input() items: Tab[] = [];

    @Output() tabChanged = new EventEmitter();

    selectTab(item: Tab) {
        this.items.map((i) => {
            i.active = false;
        });
        item.active = true;
        this.tabChanged.emit(item.code);
    }

    constructor() { }
}

export interface Tab {
    label: string;
    icon?: string;
    code: string;
    active: boolean;
}
