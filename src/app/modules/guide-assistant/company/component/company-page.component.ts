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

import {FormMode} from "../../common/enum/form-mode";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {CompanyRestService} from "../service/company-rest-service";
import {CompanyModel} from "../model/company-model";
import {CountryModel} from "../../country/model/country-model";
import {CitySaveModel} from "../../city/model/city-save-model";
import {DistrictSaveModel} from "../../district/model/district-save-model";
import {CountryRestService} from "../../country/service/country-rest-service";
import {CityRestService} from "../../city/service/city-rest-service";
import {DistrictRestService} from "../../district/service/district-rest-service";
import {PageCode} from "../../common/enum/page-code";
import {CountrySearchModel} from "../../country/model/country-search-model";
import {CompanySaveModel} from "../model/company-save-model";
import {CompanySearchModel} from "../model/company-search-model";
import {CitySearchModel} from "../../city/model/city-search-model";
import {DistrictSearchModel} from "../../district/model/district-search-model";

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
    templateUrl: './company-page.component.html'
})
export class CompanyPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: CompanyModel[];
    selectedItem: CompanyModel;
    subscriptions: Subscription[];
    countryList: CountryModel[];
    cityList: CitySaveModel[];
    districtList: DistrictSaveModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: CompanyRestService,
        private countryService: CountryRestService,
        private cityService: CityRestService,
        private districtService: DistrictRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.countryList = [];
        this.cityList = [];
        this.districtList = [];
        this.pageCode = PageCode.COMPANY;

        this.buildForm();
        this.loadCountryList();
        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new CompanySaveModel());
    }

    loadCountryList() {
        let searchModel: CountrySearchModel = new CountrySearchModel();
        searchModel.active = true;
        let subscription = this.countryService.getList(searchModel).subscribe((response => {
            this.countryList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadCityList() {
        let searchModel: CitySearchModel = new CitySearchModel();
        searchModel.countryId = this.form.value.countryId;
        searchModel.active = true;
        let subscription = this.cityService.getList(searchModel).subscribe((response => {
            this.cityList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadDistrictList() {
        let searchModel: DistrictSearchModel = new DistrictSearchModel();
        searchModel.cityId = this.form.value.cityId;
        searchModel.active = true;
        let subscription = this.districtService.getList(searchModel).subscribe((response => {
            this.districtList = response;
        }));
        this.subscriptions.push(subscription);
    }


    loadData() {
        const subscription = this.restService.getList(new CompanySearchModel()).subscribe((response) => {
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
        this.loadCityList();
        this.loadDistrictList();
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
        this.buildForm();
        this.form.patchValue(this.selectedItem);
        this.loadCityList();
        this.loadDistrictList();
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

    onChangeCountry() {
        this.form.patchValue({cityId: null});
        this.loadCityList();
    }

    onChangeCity() {
        this.form.patchValue({districtId: null});
        this.loadDistrictList();
    }

    get FormMode() {
        return FormMode;
    }
}
