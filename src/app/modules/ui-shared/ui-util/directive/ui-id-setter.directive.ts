import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[formControlName]',
})
export class UiIdSetterDirective implements OnInit {
    @Input() idPrefix?: string;
    @HostBinding('id') propId: string;
    @HostBinding('name') propName: string;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        // Simdilik id leri undefined olmasini bu sekilde engelledik.
        // ik ekibi bu directive in kullanildigi yerleri kaldirdiginda bu directive silinebilir.
        if (!this.idPrefix && this.elementRef.nativeElement.getAttribute('id')) {
            this.propId = this.elementRef.nativeElement.getAttribute('id');
        } else {
            if (this.idPrefix) {
                const formControlName = this.elementRef.nativeElement.getAttribute('formControlName');
                if (formControlName) {
                    const attrId = this.elementRef.nativeElement.getAttribute('id');
                    if (!attrId) {
                        this.propId = this.idPrefix + '_' + formControlName;
                    }
                    const attrName = this.elementRef.nativeElement.getAttribute('name');
                    if (!attrName) {
                        this.propName = formControlName;
                    }
                }
            }
        }
    }
}
