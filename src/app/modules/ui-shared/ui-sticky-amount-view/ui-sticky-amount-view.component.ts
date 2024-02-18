import { Component, HostListener, Input, ViewChild, AfterViewInit, ElementRef, } from '@angular/core';

import { UiAmountViewModel } from '../ui-util/model/amount-view-model';

@Component({
    selector: 'ui-sticky-amount-view',
    templateUrl: './ui-sticky-amount-view.component.html',
    styleUrls: ['./ui-sticky-amount-view.component.scss'],
})
export class UiStickyAmountViewComponent implements AfterViewInit {
    private _itemList: UiAmountViewModel[];
    @Input() set itemList(value: UiAmountViewModel[]) {
        if (value === this._itemList) return;
        this._itemList = value;
    }

    get itemList(): UiAmountViewModel[] {
        return this._itemList;
    }

    widthValue: number;

    @ViewChild('parentEl') parentEl: ElementRef;
    @ViewChild('fixedEl') fixedEl: ElementRef;

    constructor() {}

    ngAfterViewInit() {
        this.widthValue = this.parentEl.nativeElement.offsetWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.widthValue = this.parentEl.nativeElement.offsetWidth;
    }
}
