import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'm-slider',
    templateUrl: './m-slider.component.html',
    styleUrls: ['./m-slider.component.sass']
})
export class MSliderComponent implements OnInit {
    @Input() max: number = 100;
    @Input() min: number = 0;
    @Input() value: number = 0;

    @Output() valueChange = new EventEmitter<number>();

    thumbPosition: number = 0;
    showTooltip: boolean = false;

    initialThumbPos = 'unset';

    constructor() { }

    ngOnInit(): void {
        this.thumbPosition = ((this.value - this.min) / (this.max - this.min)) * 95;
        this.initialThumbPos = this.thumbPosition + '%';
    }

    onThumbDragStart(event: CdkDragStart): void {
        this.initialThumbPos = 'unset';
        const containerWidth = 318;
        const thumbWidth = event.source.element.nativeElement.offsetWidth;
        const thumbPosition = event.source.getFreeDragPosition().x + thumbWidth / 2;
        this.thumbPosition = (thumbPosition / containerWidth) * 100;

        this.thumbPosition = Math.round(this.thumbPosition);
        this.value = Math.round((this.thumbPosition / 100) * (this.max - this.min) + this.min);

        if (this.showTooltip) {
            this.onThumbDragStart(event);
        }
    }

    onThumbDragEnd(event: CdkDragEnd): void {
        this.valueChange.emit(this.value);
    }
}
