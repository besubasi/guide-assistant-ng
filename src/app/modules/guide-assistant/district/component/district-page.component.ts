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
import {DistrictModel} from "../model/district-model";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {DistrictRestService} from "../service/district-rest-service";
import {CountryRestService} from "../../country/service/country-rest-service";
import {CountryModel} from "../../country/model/country-model";
import {CountrySearchModel} from "../../country/model/country-search-model";
import {DistrictSearchModel} from "../model/district-search-model";
import {CityModel} from "../../city/model/city-model";
import {CityRestService} from "../../city/service/city-rest-service";
import {CitySearchModel} from "../../city/model/city-search-model";

@Component({
    selector: 'app-district-page',
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
    styleUrls: ['./district-page.component.scss'],
    templateUrl: './district-page.component.html'
})
export class DistrictPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: DistrictModel[];
    selection: DistrictModel;
    subscriptions: Subscription[];
    countryList: CountryModel[];
    allCityList: CityModel[];
    cityList: CityModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: DistrictRestService,
        private cityService: CityRestService,
        private countryService: CountryRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.countryList = [];
        this.cityList = [];
        this.pageCode = "3-5";

        this.buildForm();
        this.loadCountryList();
        this.loadCityList();
        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new DistrictModel());
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
        searchModel.active = true;
        let subscription = this.cityService.getList(searchModel).subscribe((response => {
            this.allCityList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadData() {
        const subscription = this.restService.getList(new DistrictSearchModel()).subscribe((response) => {
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
        let subscription = this.restService.deleteById(this.selection.id).subscribe(() => {
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
                console.log(response);
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
        if (this.form.value.countryId) {
            this.cityList = this.allCityList?.filter(x => x.countryId == this.form.value.countryId);
        } else {
            this.cityList = this.allCityList;
        }
    }

    get FormMode() {
        return FormMode;
    }
}
