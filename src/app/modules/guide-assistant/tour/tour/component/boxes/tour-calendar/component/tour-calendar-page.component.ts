import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ToolbarModule} from "primeng/toolbar";
import {UiPageTitleModule} from "../../../../../../../ui-shared/ui-page-title/ui-page-title.module";
import {UiSideBarModule} from "../../../../../../../ui-shared/ui-sidebar/ui-sidebar.module";
import {UiUtilModule} from "../../../../../../../ui-shared/ui-util/ui-util.module";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {FormMode} from '../../../../../../common/enum/form-mode';
import {TourCalendarRestService} from "../service/tour-calendar-rest-service";
import {TourSaveModel} from "../../../../model/tour-save-model";
import {TourCalendarSearchModel} from "../model/tour-calendar-search-model";
import {PageCode} from "../../../../../../common/enum/page-code";
import {TourCalendarModel} from "../model/tour-calendar-model";
import {EditorModule} from "primeng/editor";
import {TableModule} from "primeng/table";
import {
    UiActiveInactiveTagsModule
} from "../../../../../../../ui-shared/ui-active-inactive-tags/ui-active-inactive-tags.module";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";

@Component({
    selector: 'app-tour-calendar-page',
    standalone: true,
    imports: [
        ButtonModule,
        CheckboxModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        ToolbarModule,
        UiPageTitleModule,
        UiSideBarModule,
        UiUtilModule,
        EditorModule,
        TableModule,
        UiActiveInactiveTagsModule,
        InputNumberModule,
        InputTextareaModule,
        CalendarModule
    ],
    templateUrl: './tour-calendar-page.component.html',
    styleUrl: './tour-calendar-page.component.scss'
})
export class TourCalendarPageComponent implements OnInit, OnDestroy {

    @Input() tour: TourSaveModel;

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: TourCalendarModel[];
    selection: TourCalendarModel;
    subscriptions: Subscription[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourCalendarRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.TOUR_DAY_DESCRIPTION;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];

        this.buildForm();
        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new TourCalendarModel());
        this.form.patchValue({tourId: this.tour?.id});
    }

    loadData() {
        let searchModel = new TourCalendarSearchModel();
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

    get FormMode() {
        return FormMode;
    }
}
