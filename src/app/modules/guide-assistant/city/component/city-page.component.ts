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
import {CityModel} from "../model/city-model";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {CityRestService} from "../service/city-rest-service";
import {CountryRestService} from "../../country/service/country-rest-service";
import {CountrySearchModel} from "../../country/model/country-search-model";
import {CitySearchModel} from "../model/city-search-model";
import {LookupModel} from "../../common/model/lookup-model";
import {PageCode} from "../../common/enum/page-code";

@Component({
    selector: 'app-city-page',
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
    styleUrls: ['./city-page.component.scss'],
    templateUrl: './city-page.component.html'
})
export class CityPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: CityModel[];
    selectedItem: CityModel;
    subscriptions: Subscription[];
    countryList: LookupModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: CityRestService,
        private countryService: CountryRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.countryList = [];
        this.pageCode = PageCode.CITY;

        this.buildForm();
        this.loadCountryList();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new CityModel());
    }

    loadCountryList() {
        let searchModel: CountrySearchModel = new CountrySearchModel();
        searchModel.active = true;
        let subscription = this.countryService.getLookupList(searchModel).subscribe((response => {
            this.countryList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadListData() {
        const subscription = this.restService.getList(new CitySearchModel()).subscribe((response) => {
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
        let apiModel: CityModel = this.form.value;

        let subscription = this.restService.save(apiModel).subscribe(
            response => {
                console.log(response);
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
