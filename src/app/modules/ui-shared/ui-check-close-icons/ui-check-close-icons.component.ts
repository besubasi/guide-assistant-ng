import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-check-close-icons',
    template: `
        <div class="ui-check-close-icons" *ngIf="itemValue !== null">
            <i *ngIf="itemValue" class="material-icons check-icon">check</i>
            <i *ngIf="!itemValue" class="material-icons close-icon">close</i>
        </div>
    `,
    styleUrls: ['./ui-check-close-icons.component.scss'],
})
export class UiCheckCloseIconsComponent {
    @Input() itemValue: boolean = null;
}
