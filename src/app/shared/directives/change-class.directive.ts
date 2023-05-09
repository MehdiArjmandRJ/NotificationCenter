import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[activeBtn]',
})
//change active class between 2 btn Dara trader and and Observe
export class ActiveBtnDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  @HostListener('click', ['$event'])
  onClick() {
    const el = Array.from(
      this.elementRef.nativeElement.offsetParent.children[0].children[0]
        .children
    );

    el.forEach((element) => {
      this.renderer.removeClass(element, 'active');
      this.renderer.addClass(this.elementRef.nativeElement, 'active');
    });
  }
}
