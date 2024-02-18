import { Component, Input, OnInit } from '@angular/core';
import { UiTranslateLoaderService } from '../ui-util/service/ui-translate-loader';
import { UiAmountViewModel } from '../ui-util/model/amount-view-model';

@Component({
    selector: 'ui-amount-view',
    templateUrl: './ui-amount-view.component.html',
    styleUrls: ['./ui-amount-view.component.scss'],
})
export class UiAmountViewComponent implements OnInit {
    private _itemList: UiAmountViewModel[];
    @Input() set itemList(value: UiAmountViewModel[]) {
        if (value === this._itemList) return;
        this._itemList = value;
    }

    get itemList(): UiAmountViewModel[] {
        return this._itemList;
    }

    constructor(protected translateService: UiTranslateLoaderService) {}

    ngOnInit(): void {}

    trackByFn(index: number): number {
        return index;
    }
}
