import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {Subscription} from "rxjs";

import {FormMode} from "../../../../../common/enum/form-mode";
import {ActivityTariffModel} from "../model/activity-tariff-model";
import {UiSharedModule} from "../../../../../../ui-shared/ui-shared.module";
import {ActivityTariffRestService} from "../service/activity-tariff-rest-service";
import {ActivityTariffSearchModel} from "../model/activity-tariff-search-model";
import {LookupModel} from "../../../../../common/model/lookup-model";
import {PageCode} from "../../../../../common/enum/page-code";
import {PricingTypeRestService} from "../../../../../pricing-type/service/pricing-type-rest-service";
import {CurrencyRestService} from "../../../../../currency/service/currency-rest-service";
import {PricingTypeSearchModel} from "../../../../../pricing-type/model/pricing-type-search-model";
import {CurrencySearchModel} from "../../../../../currency/model/currency-search-model";
import {CalendarModule} from "primeng/calendar";
import {ActivityModel} from "../../../../model/activity-model";

@Component({
    selector: 'app-activity-tariff-page',
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
        CalendarModule,
        FormsModule,
        DatePipe,
    ],
    templateUrl: './activity-tariff-page.component.html'
})
export class ActivityTariffPageComponent implements OnInit, OnDestroy {

    @Input() activity: ActivityModel;

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: ActivityTariffModel[];
    selectedItem: ActivityTariffModel;
    subscriptions: Subscription[];
    pricingTypeList: LookupModel[];
    currencyList: LookupModel[];
    startDate: Date;

    constructor(
        private formBuilder: FormBuilder,
        private restService: ActivityTariffRestService,
        private pricingTypeRestService: PricingTypeRestService,
        private currencyRestService: CurrencyRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.pricingTypeList = [];
        this.pageCode = PageCode.ACTIVITY_TARIFF;

        this.buildForm();
        this.loadPricingTypeList();
        this.loadCurrencyList();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.startDate = null;
        this.form = this.formBuilder.group(new ActivityTariffModel());
        this.form.patchValue({activityId: this.activity?.id});
    }

    loadPricingTypeList() {
        let searchModel: PricingTypeSearchModel = new PricingTypeSearchModel();
        searchModel.active = true;
        let subscription = this.pricingTypeRestService.getLookupList(searchModel).subscribe((response => {
            this.pricingTypeList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadCurrencyList() {
        let searchModel: CurrencySearchModel = new CurrencySearchModel();
        searchModel.active = true;
        let subscription = this.currencyRestService.getLookupList(searchModel).subscribe((response => {
            this.currencyList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadListData() {
        const subscription = this.restService.getList(new ActivityTariffSearchModel()).subscribe((response) => {
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
        this.startDate = new Date(this.selectedItem?.startDate);
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
        this.buildForm();
        this.form.patchValue(this.selectedItem);
        this.startDate = new Date(this.selectedItem?.startDate);
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
        this.form.patchValue({startDate: this.startDate.toJSON()})
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
