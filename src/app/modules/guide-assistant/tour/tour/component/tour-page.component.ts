import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from '@angular/forms';
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {Subscription} from "rxjs";

import {FormMode} from "../../../common/enum/form-mode";
import {TourModel} from "../model/tour-model";
import {UiSharedModule} from "../../../../ui-shared/ui-shared.module";
import {TourRestService} from "../service/tour-rest-service";
import {TourSearchModel} from "../model/tour-search-model";
import {TourFormComponent} from "./tour-form.component";
import {PageCode} from "../../../common/enum/page-code";

@Component({
    selector: 'app-tour-page',
    standalone: true,
    imports: [
        NgStyle,
        ButtonModule,
        CurrencyPipe,
        MenuModule,
        SharedModule,
        TableModule,
        ChartModule,
        InputTextModule,
        ReactiveFormsModule,
        NgIf,
        ToolbarModule,
        CardModule,
        CheckboxModule,
        RippleModule,
        DividerModule,
        UiSharedModule,
        InputNumberModule,
        DropdownModule,
        TourFormComponent,
    ],
    styleUrls: ['./tour-page.component.scss'],
    templateUrl: './tour-page.component.html'
})
export class TourPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    list: TourModel[];
    selection: TourModel;
    subscriptions: Subscription[];
    isReloadNecessary: boolean;

    constructor(
        private restService: TourRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.TOUR;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.isReloadNecessary = false;

        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadData() {
        const subscription = this.restService.getList(new TourSearchModel()).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    onAdd() {
        this.formMode = FormMode.ADD;
    }

    onCopy() {
        this.formMode = FormMode.COPY;
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
    }

    onDelete() {
        this.restService.delete(this.selection.id).subscribe(() => {
            this.onCancel();
            this.loadData();
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
        });
    }

    onCancel() {
        this.formMode = FormMode.NONE;
        if (this.isReloadNecessary)
            this.loadData();

        this.isReloadNecessary = false;
    }

    onBack() {
        this.onCancel();
    }

    eventSave() {
        this.isReloadNecessary = true;
    }

    get FormMode() {
        return FormMode;
    }
}
