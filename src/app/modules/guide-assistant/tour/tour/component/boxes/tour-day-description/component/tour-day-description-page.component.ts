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
import {TourDayDescriptionRestService} from "../service/tour-day-description-rest-service";
import {TourSaveModel} from "../../../../model/tour-save-model";
import {TourDayDescriptionSearchModel} from "../model/tour-day-description-search-model";
import {PageCode} from "../../../../../../common/enum/page-code";
import {TourDayDescriptionModel} from "../model/tour-day-description-model";
import {EditorModule} from "primeng/editor";
import {TableModule} from "primeng/table";
import {
    UiActiveInactiveTagsModule
} from "../../../../../../../ui-shared/ui-active-inactive-tags/ui-active-inactive-tags.module";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
    selector: 'app-tour-day-description-page',
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
        InputTextareaModule
    ],
    templateUrl: './tour-day-description-page.component.html',
    styleUrl: './tour-day-description-page.component.scss'
})
export class TourDayDescriptionPageComponent implements OnInit, OnDestroy {

    @Input() tour: TourSaveModel;

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: TourDayDescriptionModel[];
    selection: TourDayDescriptionModel;
    subscriptions: Subscription[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourDayDescriptionRestService,
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
        this.form = this.formBuilder.group(new TourDayDescriptionModel());
        this.form.patchValue({tourId: this.tour?.id});
    }

    loadData() {
        let searchModel = new TourDayDescriptionSearchModel();
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
        let subscription = this.restService.delete(this.selection.id).subscribe(() => {
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
