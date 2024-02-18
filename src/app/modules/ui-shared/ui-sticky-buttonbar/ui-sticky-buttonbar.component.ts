import { Component, OnInit, Input } from '@angular/core';

@Component({
    styleUrls: ['./ui-sticky-buttonbar.component.scss'],
    selector: 'ui-sticky-buttonbar',
    template: `
        <div class="ui-sticky-buttonbar-wrapper" [style]="inModal ? 'bottom: -52px' : ''">
            <div class="left-content" *ngIf="leftContent">
                <ng-content select="[leftContent]"></ng-content>
            </div>
            <div class="buttonbar-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
})
export class UiStickyButtonbarComponent implements OnInit {
    constructor() {}

    @Input() leftContent: boolean = false;
    @Input() inModal: boolean = false;

    ngOnInit() {}
}
