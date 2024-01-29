import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";


import {Subscription} from "rxjs";
import {TourRestService} from "../../tour/service/tour-rest-service";
import {FormMode} from 'src/app/common/form-mode';
import {TourCategoryModel} from "../model/tour-category-model";
import {TourCategoryListComponent} from "./tour-category-list/tour-category-list.component";

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
    ],
    styleUrls: ['./tour-category-page.component.scss'],
    templateUrl: './tour-category-page.component.html'
})
export class TourCategoryPageComponent implements OnInit, OnDestroy {

    form: UntypedFormGroup;
    formMode: string;
    selectedModel: TourCategoryModel;
    subscriptions: Subscription[];

    constructor(
        private fb: FormBuilder,
        private restService: TourRestService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.fb.group({
            id: [null],
            name: [null, [Validators.required]]
        });
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
        this.form.patchValue(this.selectedModel);
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
        this.buildForm();
        this.form.patchValue(this.selectedModel);
    }

    onDelete() {
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

        let subscription = this.restService.generate(apiModel).subscribe(
            response => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: "Api Oluşturuldu"});
            }
        );
        this.subscriptions.push(subscription);
    }


    get FormMode() {
        return FormMode;
    }
}
