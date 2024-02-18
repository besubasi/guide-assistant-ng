import {Component, Input} from '@angular/core';

@Component({
    selector: 'ui-active-inactive-tags',
    template: `
        <div class="ui-active-inactive-tags" *ngIf="tagValue !== null">
            <p-tag *ngIf='tagValue' severity='info' styleClass="active-tag-style-class" value="Aktif"></p-tag>
            <p-tag *ngIf='!tagValue' styleClass="inactive-tag-style-class" value="Pasif"></p-tag>
        </div>
    `,
})
export class UiActiveInactiveTagsComponent {
    @Input() tagValue: boolean = null;
}
