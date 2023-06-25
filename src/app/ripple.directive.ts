import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[Ripple]'
})
export class RippleDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        const rippleX = event.pageX - this.elementRef.nativeElement.offsetLeft;
        const rippleY = event.pageY - this.elementRef.nativeElement.offsetTop;
        const width = this.elementRef.nativeElement.offsetWidth;

        // add class ripple to element
        this.renderer.addClass(this.elementRef.nativeElement, 'ripple');

        const ripple = this.renderer.createElement('span');
        this.renderer.addClass(ripple, 'ripple-effect');
        this.renderer.setStyle(ripple, 'left', rippleX + 'px');
        this.renderer.setStyle(ripple, 'top', rippleY + 'px');
        this.renderer.setProperty(ripple, '--scale', width);

        this.renderer.appendChild(this.elementRef.nativeElement, ripple);

        setTimeout(() => {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ripple');
            this.renderer.removeChild(this.elementRef.nativeElement, ripple);
        }, 500);
    }
}
