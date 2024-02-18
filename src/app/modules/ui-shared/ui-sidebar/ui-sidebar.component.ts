import { Component, Input } from '@angular/core';
import { KovanSizes } from '../ui-util/model/kovan-sizes';

@Component({
    styleUrls: ['./ui-sidebar.component.scss'],
    selector: 'ui-sidebar',
    templateUrl: './ui-sidebar.component.html',
})
export class UiSideBarComponent {
    @Input() sideBarSize = KovanSizes.SIDEBAR_WIDTH_MEDIUM;
    @Input() topBarSize = KovanSizes.TOPBAR_HEIGHT;

    @Input() display: boolean = false;
    @Input() sidebarPosition: string = 'right';
    @Input() appendTo: string = 'body';
}
