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
import {TourSearchModel} from "../model/tour-search-model";
import {TourFormComponent} from "./tour-form.component";
import {PageCode} from "../../../common/enum/page-code";
import {AccordionModule} from "primeng/accordion";
import {TourTypeModel} from "../../tourtype/model/tour-type-model";
import {CompanyRestService} from "../../../company/service/company-rest-service";
import {TourTypeRestService} from "../../tourtype/service/tour-type-rest-service";
import {CompanySearchModel} from "../../../company/model/company-search-model";
import {TourTypeSearchModel} from "../../tourtype/model/tour-type-search-model";
import {LookupModel} from "../../../common/model/lookup-model";

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
        AccordionModule,
    ],
    templateUrl: './tour-page.component.html'
})
export class TourPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    searchForm: UntypedFormGroup;
    list: TourModel[];
    selectedItem: TourModel;
    subscriptions: Subscription[];
    isReloadNecessary: boolean;

    companyList: LookupModel[];
    allTourTypeList: TourTypeModel[];
    tourTypeList: TourTypeModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourRestService,
        private companyService: CompanyRestService,
        private tourTypeService: TourTypeRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.TOUR;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.companyList = [];
        this.allTourTypeList = [];
        this.tourTypeList = [];
        this.isReloadNecessary = false;
        this.searchForm = this.formBuilder.group(new TourSearchModel());

        this.loadCompanyList();
        this.loadTourTypeList();
        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadCompanyList() {
        let searchModel: CompanySearchModel = new CompanySearchModel();
        searchModel.active = true;
        let subscription = this.companyService.getLookupList(searchModel).subscribe((response => {
            this.companyList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadTourTypeList() {
        let searchModel: TourTypeSearchModel = new TourTypeSearchModel();
        searchModel.companyId = this.searchForm.value.companyId;
        searchModel.active = true;
        let subscription = this.tourTypeService.getList(searchModel).subscribe((response => {
            this.allTourTypeList = response;
        }));
        this.subscriptions.push(subscription);
    }

    onChangeCompany() {
        this.searchForm.patchValue({tourTypeId: null});
        if (this.searchForm.value.companyId) {
            this.tourTypeList = this.allTourTypeList?.filter(x => x.companyId == this.searchForm.value.companyId);
        } else {
            this.tourTypeList = this.allTourTypeList;
        }
    }


    loadData() {
        const subscription = this.restService.getList(this.searchForm.value).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    onClear() {
        this.searchForm.reset();
        this.searchForm.patchValue(new TourSearchModel());
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
