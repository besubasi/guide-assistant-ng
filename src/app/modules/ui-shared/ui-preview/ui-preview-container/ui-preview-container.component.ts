import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PreviewContainerModel } from '../model/preview-container-model';

@Component({
    selector: 'ui-preview-container',
    templateUrl: './ui-preview-container.component.html',
    styleUrls: ['./ui-preview-container.component.scss'],
})
export class UiPreviewContainerComponent implements OnInit {
    @Input() preview: PreviewContainerModel;
    @Input() title: string;

    constructor() {}

    ngOnInit(): void {}
}
