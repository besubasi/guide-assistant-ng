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

import { FormMode } from '../../common/enum/form-mode';
import {TourTypeModel} from "../model/tour-type-model";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {TourTypeRestService} from "../service/tour-type-rest-service";
import {CompanyRestService} from "../../company/service/company-rest-service";
import {CompanyModel} from "../../company/model/company-model";
import {CompanySearchModel} from "../../company/model/company-search-model";
import {TourTypeSearchModel} from "../model/tour-type-search-model";
import {TourCategoryModel} from "../../tour-category/model/tour-category-model";
import {TourCategoryRestService} from "../../tour-category/service/tour-category-rest-service";
import {TourCategorySearchModel} from "../../tour-category/model/tour-category-search-model";
import {PageCode} from "../../common/enum/page-code";

@Component({
    selector: 'app-tour-type-page',
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
    templateUrl: './tour-type-page.component.html'
})
export class TourTypePageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: TourTypeModel[];
    selectedItem: TourTypeModel;
    subscriptions: Subscription[];
    companyList: CompanyModel[];
    tourCategoryList: TourCategoryModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourTypeRestService,
        private tourCategoryService: TourCategoryRestService,
        private companyService: CompanyRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.companyList = [];
        this.tourCategoryList = [];
        this.pageCode = PageCode.TOUR_TYPE;

        this.buildForm();
        this.loadCompanyList();
        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new TourTypeModel());
    }

    loadCompanyList() {
        let searchModel: CompanySearchModel = new CompanySearchModel();
        searchModel.active = true;
        let subscription = this.companyService.getList(searchModel).subscribe((response => {
            this.companyList = response;
            this.companyList?.forEach(x => x.name = x.code + ' - ' + x.name);
        }));
        this.subscriptions.push(subscription);
    }

    loadTourCategoryList() {
        let searchModel: TourCategorySearchModel = new TourCategorySearchModel();
        searchModel.companyId = this.form.value.companyId;
        searchModel.active = true;
        let subscription = this.tourCategoryService.getList(searchModel).subscribe((response => {
            this.tourCategoryList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadData() {
        const subscription = this.restService.getList(new TourTypeSearchModel()).subscribe((response) => {
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
        let subscription = this.restService.deleteById(this.selectedItem.id).subscribe(() => {
            this.onCancel();
            this.loadData();
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
        });
        this.subscriptions.push(subscription);
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
                this.loadData();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "İşlem başarıyla kaydedildi."
                });
            }
        );
        this.subscriptions.push(subscription);
    }

    onChangeCompany() {
        this.form.patchValue({tourCategoryId: null});
        this.loadTourCategoryList();
    }

    get FormMode() {
        return FormMode;
    }
}
