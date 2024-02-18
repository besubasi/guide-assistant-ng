import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'ui-page-header',
    templateUrl: './ui-page-header.component.html',
    styleUrls: ['./ui-page-header.component.scss'],
})
export class UiPageHeaderComponent implements OnInit {
    @Input() title: string;
    @Input() pageCode: string;
    @Input() showBack: boolean = false;
    @Input() showMore: boolean = true;

    moreItems: MenuItem[] = [];

    /**
     * @description Geri dön düğmesine basıldığında tetiklenir
     */
    @Output() onBack = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    goBack() {
        this.onBack.emit();
    }

}
