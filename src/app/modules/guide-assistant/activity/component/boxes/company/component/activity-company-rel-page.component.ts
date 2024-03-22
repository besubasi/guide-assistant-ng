import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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

import {ActivityCompanyRelModel} from "../model/activity-company-rel-model";
import {ActivityCompanyRelRestService} from "../service/activity-company-rel-rest-service";
import {ActivityCompanyRelSearchModel} from "../model/activity-company-rel-search-model";
import {UiSharedModule} from "../../../../../../ui-shared/ui-shared.module";
import {LookupModel} from "../../../../../common/model/lookup-model";
import {ActivityCompanyRestService} from "../../../../../activity-company/service/activity-company-rest-service";
import {PageCode} from "../../../../../common/enum/page-code";
import {FormMode} from "../../../../../common/enum/form-mode";
import {ActivityCompanySearchModel} from "../../../../../activity-company/model/activity-company-search-model";
import {ActivityModel} from "../../../../model/activity-model";

@Component({
    selector: 'app-activity-company-rel-page',
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
    ],
    templateUrl: './activity-company-rel-page.component.html'
})
export class ActivityCompanyRelPageComponent implements OnInit, OnDestroy {

    @Input() activity: ActivityModel;

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: ActivityCompanyRelModel[];
    selectedItem: ActivityCompanyRelModel;
    subscriptions: Subscription[];
    activiyCompanyList: LookupModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: ActivityCompanyRelRestService,
        private activityCompanyRestService: ActivityCompanyRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.activiyCompanyList = [];
        this.pageCode = PageCode.CITY;

        this.buildForm();
        this.loadCountryList();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new ActivityCompanyRelModel());
        this.form.patchValue({activityId: this.activity?.id});
    }

    loadCountryList() {
        let searchModel: ActivityCompanySearchModel = new ActivityCompanySearchModel();
        searchModel.active = true;
        let subscription = this.activityCompanyRestService.getLookupList(searchModel).subscribe((response => {
            this.activiyCompanyList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadListData() {
        let queryModel: ActivityCompanyRelSearchModel = new ActivityCompanyRelSearchModel();
        queryModel.activityId = this.activity?.id;
        queryModel.activityCompanyId = 1;

        const subscription = this.restService.getList(queryModel).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    onAdd() {
        this.formMode = FormMode.ADD;
        this.buildForm();
    }

    onCopy() {
        this.formMode = FormMode.COPY;
        this.buildForm();
        this.form.patchValue(this.selectedItem);
        this.form.patchValue({id: null});
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
        this.buildForm();
        this.form.patchValue(this.selectedItem);
    }

    onDelete() {
        this.restService.deleteById(this.selectedItem.id).subscribe(() => {
            this.onCancel();
            this.loadListData();
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
        });
    }

    onCancel() {
        this.formMode = FormMode.NONE;
        this.form.reset();
        this.buildForm();
    }

    onSave() {
        let subscription = this.restService.save(this.form.value).subscribe(
            response => {
                this.onCancel();
                this.loadListData();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "İşlem başarıyla kaydedildi."
                });
            }
        );
        this.subscriptions.push(subscription);
    }


    get FormMode() {
        return FormMode;
    }
}
