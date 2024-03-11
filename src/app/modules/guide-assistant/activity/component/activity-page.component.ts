import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {Subscription} from "rxjs";
import {AccordionModule} from "primeng/accordion";

import {FormMode} from "../../common/enum/form-mode";
import {ActivityModel} from "../model/activity-model";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {ActivityRestService} from "../service/activity-rest-service";
import {ActivitySearchModel} from "../model/activity-search-model";
import {ActivityFormComponent} from "./activity-form.component";
import {PageCode} from "../../common/enum/page-code";

@Component({
    selector: 'app-activity-page',
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
        ActivityFormComponent,
        AccordionModule,
    ],
    templateUrl: './activity-page.component.html'
})
export class ActivityPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    searchForm: UntypedFormGroup;
    list: ActivityModel[];
    selectedItem: ActivityModel;
    subscriptions: Subscription[];
    isReloadNecessary: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private restService: ActivityRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.ACTIVITY;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.isReloadNecessary = false;
        this.searchForm = this.formBuilder.group(new ActivitySearchModel());

        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadData() {
        const subscription = this.restService.getList(this.searchForm.value).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    onClear() {
        this.searchForm.reset();
        this.searchForm.patchValue(new ActivitySearchModel());
        this.loadData();
    }

    onSearch() {
        this.loadData();
    }

    onAdd() {
        this.selectedItem = null;
        this.formMode = FormMode.ADD;
    }

    onCopy() {
        this.formMode = FormMode.COPY;
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
    }

    onDelete() {
        this.restService.deleteById(this.selectedItem.id).subscribe(() => {
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
