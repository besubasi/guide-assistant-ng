import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {UiSharedModule} from "../../../../../ui-shared/ui-shared.module";
import {TourCategoryModel} from "../../model/tour-category-model";
import {TourCategorySearchModel} from "../../model/tour-category-search-model";
import {Subscription} from "rxjs";
import {TourCategoryRestService} from "../../service/tour-category-rest-service";

@Component({
    selector: 'app-tour-category-list',
    standalone: true,
    imports: [
        CardModule,
        TableModule,
        DropdownModule,
        UiSharedModule
    ],
    templateUrl: './tour-category-list.component.html',
    styleUrl: './tour-category-list.component.scss'
})
export class TourCategoryListComponent implements OnInit, OnDestroy {

    pageCode: string;
    list: TourCategoryModel[];
    selectedModel: TourCategoryModel;
    subscriptions: Subscription[];

    @Output() onRowSelectEvent = new EventEmitter();
    @Output() onRowUnselectEvent = new EventEmitter();


    constructor(
        private restService: TourCategoryRestService
    ) {

    }

    ngOnInit(): void {
        this.list = [];
        this.subscriptions = [];
        this.pageCode = "3-5";

        this.loadListData();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((x) => x.unsubscribe());
    }

    loadListData() {
        const subscription = this.restService.getList(new TourCategorySearchModel()).subscribe((response) => {
            this.list = response;
            this.list?.forEach(x => x.companyName = x.companyCode + ' - ' + x.companyName);
        });
        this.subscriptions.push(subscription);
    }

    onRowSelect() {
        this.onRowSelectEvent.emit(this.selectedModel);
    }

    onRowUnSelect() {
        this.onRowUnselectEvent.emit(null);
    }
}
