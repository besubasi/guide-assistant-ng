import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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


import {Subscription} from "rxjs";
import {FormMode} from 'src/app/common/form-mode';
import {TourCategoryModel} from "../model/tour-category-model";
import {TourCategoryListComponent} from "./tour-category-list/tour-category-list.component";
import {UiSharedModule} from "../../../../ui-shared/ui-shared.module";
import {InputNumberModule} from "primeng/inputnumber";
import {TourCategoryRestService} from "../service/tour-category-rest-service";
import {CompanyRestService} from "../../../company/service/company-rest-service";
import {CompanyModel} from "../../../company/model/company-model";
import {DropdownModule} from "primeng/dropdown";
import {CompanySearchModel} from "../../../company/model/company-search-model";

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
        TourCategoryListComponent,
        UiSharedModule,
        InputNumberModule,
        DropdownModule,
    ],
    styleUrls: ['./tour-category-page.component.scss'],
    templateUrl: './tour-category-page.component.html'
})
export class TourCategoryPageComponent implements OnInit, OnDestroy {

    @ViewChild(TourCategoryListComponent) listComponent: TourCategoryListComponent;

    form: UntypedFormGroup;
    formMode: string;
    subscriptions: Subscription[];
    companyList: CompanyModel[];

    constructor(
        private fb: FormBuilder,
        private restService: TourCategoryRestService,
        private companyService: CompanyRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.companyList = [];
        this.buildForm();
        this.loadCompanyList();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.fb.group(new TourCategoryModel());
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

    onRowSelect() {

    }

    onRowUnselect() {

    }

    onAdd() {
        this.formMode = FormMode.ADD;
        this.buildForm();
    }

    onCopy() {
        this.formMode = FormMode.COPY;
        this.buildForm();
        this.form.patchValue(this.listComponent?.selectedModel);
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
        this.buildForm();
        this.form.patchValue(this.listComponent?.selectedModel);
    }

    onDelete() {
        this.restService.delete(this.listComponent?.selectedModel.id).subscribe(() => {
            this.onCancel();
            this.listComponent.loadListData();
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
        });
    }

    onBack() {
        this.formMode = FormMode.NONE;
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
                console.log(response);
                this.onCancel();
                this.listComponent.loadListData();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "Tur Kategorisi başarıyla kaydedildi."
                });
            }
        );
        this.subscriptions.push(subscription);
    }


    get FormMode() {
        return FormMode;
    }
}
