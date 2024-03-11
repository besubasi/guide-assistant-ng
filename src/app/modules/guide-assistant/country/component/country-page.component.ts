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
import {CountryModel} from "../model/country-model";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {CountryRestService} from "../service/country-rest-service";
import {CountrySearchModel} from "../model/country-search-model";

@Component({
    selector: 'app-country-page',
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
    styleUrls: ['./country-page.component.scss'],
    templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: CountryModel[];
    selectedItem: CountryModel;
    subscriptions: Subscription[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: CountryRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.pageCode = "3-5";

        this.buildForm();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new CountryModel());
    }


    loadListData() {
        const subscription = this.restService.getList(new CountrySearchModel()).subscribe((response) => {
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
        let apiModel: CountryModel = this.form.value;

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
