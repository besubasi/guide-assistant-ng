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
import {TourModel} from "../model/tour-model";
import {UiSharedModule} from "../../../../ui-shared/ui-shared.module";
import {TourRestService} from "../service/tour-rest-service";
import {CompanyRestService} from "../../../company/service/company-rest-service";
import {CompanyModel} from "../../../company/model/company-model";
import {CompanySearchModel} from "../../../company/model/company-search-model";
import {TourSearchModel} from "../model/tour-search-model";
import {TourTypeModel} from "../../tourtype/model/tour-type-model";
import {TourSaveModel} from "../model/tour-save-model";
import {TourTypeSearchModel} from "../../tourtype/model/tour-type-search-model";
import {TourTypeRestService} from "../../tourtype/service/tour-type-rest-service";

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
    ],
    styleUrls: ['./tour-page.component.scss'],
    templateUrl: './tour-page.component.html'
})
export class TourPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: TourModel[];
    selection: TourModel;
    subscriptions: Subscription[];
    companyList: CompanyModel[];
    tourTypeList: TourTypeModel[];

    constructor(
        private fb: FormBuilder,
        private restService: TourRestService,
        private companyService: CompanyRestService,
        private tourTypeService: TourTypeRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.companyList = [];
        this.tourTypeList = [];
        this.pageCode = "3-5";

        this.buildForm();
        this.loadCompanyList();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.fb.group(new TourSaveModel());
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

    loadTourTypeList() {
        let searchModel: TourTypeSearchModel = new TourTypeSearchModel();
        searchModel.companyId = this.form.value.companyId;
        searchModel.active = true;
        let subscription = this.tourTypeService.getList(searchModel).subscribe((response => {
            this.tourTypeList = response;
            console.log(this.tourTypeList)
        }));
        this.subscriptions.push(subscription);
    }

    loadListData() {
        const subscription = this.restService.getList(new TourSearchModel()).subscribe((response) => {
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
        this.form.patchValue(this.selection);
        this.form.patchValue({id: null});
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
        this.buildForm();
        this.form.patchValue(this.selection);
    }

    onDelete() {
        this.restService.delete(this.selection.id).subscribe(() => {
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
        let apiModel: TourModel = this.form.value;

        let subscription = this.restService.save(apiModel).subscribe(
            response => {
                console.log(response);
                this.onCancel();
                this.loadListData();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "Tur Kategorisi başarıyla kaydedildi."
                });
            }
        );
        this.subscriptions.push(subscription);
    }

    onChangeCompany() {
        this.form.patchValue({tourTypeId: null});
        this.loadTourTypeList();
    }

    get FormMode() {
        return FormMode;
    }
}
