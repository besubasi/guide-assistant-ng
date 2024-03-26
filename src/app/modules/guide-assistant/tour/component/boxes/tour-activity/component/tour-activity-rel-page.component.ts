import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {Subscription} from "rxjs";

import {TourActivityRelModel} from "../model/tour-activity-rel-model";
import {TourActivityRelRestService} from "../service/tour-activity-rel-rest-service";
import {TourActivityRelSearchModel} from "../model/tour-activity-rel-search-model";
import {CalendarModule} from "primeng/calendar";
import {TourSaveModel} from "../../../../model/tour-save-model";
import {LookupModel} from "../../../../../common/model/lookup-model";
import {ActivityRestService} from "../../../../../activity/service/activity-rest-service";
import {FormMode} from "../../../../../common/enum/form-mode";
import {PageCode} from "../../../../../common/enum/page-code";
import {TourActivityRelSaveModel} from "../model/tour-activity-rel-save-model";
import {ActivitySearchModel} from "../../../../../activity/model/activity-search-model";
import {UiSharedModule} from "../../../../../../ui-shared/ui-shared.module";

@Component({
    selector: 'app-tour-activity-rel-page',
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
        CalendarModule,
        FormsModule,
        DatePipe,
    ],
    templateUrl: './tour-activity-rel-page.component.html'
})
export class TourActivityRelPageComponent implements OnInit, OnDestroy {

    @Input() tour: TourSaveModel;

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: TourActivityRelModel[];
    selectedItem: TourActivityRelModel;
    subscriptions: Subscription[];
    activityList: LookupModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourActivityRelRestService,
        private activityRestService: ActivityRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.activityList = [];
        this.pageCode = PageCode.TOUR_ACTIVITY_REL;

        this.buildForm();
        this.loadActivityList();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new TourActivityRelSaveModel());
        this.form.patchValue({tourId: this.tour?.id});
    }

    loadActivityList() {
        let searchModel: ActivitySearchModel = new ActivitySearchModel();
        searchModel.active = true;
        let subscription = this.activityRestService.getLookupList(searchModel).subscribe((response => {
            this.activityList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadListData() {
        let searchModel: TourActivityRelSearchModel = new TourActivityRelSearchModel();
        searchModel.tourId = this.tour?.id;
        const subscription = this.restService.getList(searchModel).subscribe((response) => {
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
        let subscription = this.restService.save(this.form.value).subscribe(
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
