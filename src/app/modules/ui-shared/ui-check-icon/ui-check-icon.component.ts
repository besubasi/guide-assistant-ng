import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-check-icon',
    template: `
        <ng-container *ngIf="iconValue">
            <i class="material-icons ui-check-icon">check</i>
        </ng-container>
    `,
    styleUrls: ['./ui-check-icon.component.scss'],
})
export class UiCheckIconComponent{
    @Input() iconValue: boolean = false;
}
