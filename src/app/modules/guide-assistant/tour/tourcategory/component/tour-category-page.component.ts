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

import {FormMode} from "../../../common/enum/form-mode";
import {TourCategoryModel} from "../model/tour-category-model";
import {UiSharedModule} from "../../../../ui-shared/ui-shared.module";
import {TourCategoryRestService} from "../service/tour-category-rest-service";
import {CompanyRestService} from "../../../company/service/company-rest-service";
import {CompanyModel} from "../../../company/model/company-model";
import {CompanySearchModel} from "../../../company/model/company-search-model";
import {TourCategorySearchModel} from "../model/tour-category-search-model";

@Component({
    selector: 'app-tour-category-page',
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
    styleUrls: ['./tour-category-page.component.scss'],
    templateUrl: './tour-category-page.component.html'
})
export class TourCategoryPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: TourCategoryModel[];
    selectedItem: TourCategoryModel;
    subscriptions: Subscription[];
    companyList: CompanyModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourCategoryRestService,
        private companyService: CompanyRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.companyList = [];
        this.pageCode = "3-5";

        this.buildForm();
        this.loadCompanyList();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new TourCategoryModel());
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

    loadListData() {
        const subscription = this.restService.getList(new TourCategorySearchModel()).subscribe((response) => {
            this.list = response;
            this.list?.forEach(x => x.companyName = x.companyCode + ' - ' + x.companyName);
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
        let apiModel: TourCategoryModel = this.form.value;

        let subscription = this.restService.save(apiModel).subscribe(
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
