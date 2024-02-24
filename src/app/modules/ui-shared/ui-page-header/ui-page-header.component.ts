import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'ui-page-header',
    templateUrl: './ui-page-header.component.html',
    styleUrls: ['./ui-page-header.component.scss'],
})
export class UiPageHeaderComponent implements OnInit {
    @Input() title: string;
    @Input() pageCode: string;
    @Input() showBack: boolean = false;

    @Output() onBack = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    goBack() {
        this.onBack.emit();
    }

}
