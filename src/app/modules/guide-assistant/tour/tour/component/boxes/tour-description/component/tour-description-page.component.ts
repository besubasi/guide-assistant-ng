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
import {TourDescriptionRestService} from "../service/tour-description-rest-service";
import {TourSaveModel} from "../../../../model/tour-save-model";
import {PageCode} from "../../../../../../common/enum/page-code";
import {TourDescriptionModel} from "../model/tour-description-model";
import {EditorModule} from "primeng/editor";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
    selector: 'app-tour-description-page',
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
        InputTextareaModule
    ],
    templateUrl: './tour-description-page.component.html',
    styleUrl: './tour-description-page.component.scss'
})
export class TourDescriptionPageComponent implements OnInit, OnDestroy {

    @Input() tour: TourSaveModel;

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    tourDescriptionModel: TourDescriptionModel;
    subscriptions: Subscription[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourDescriptionRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.TOUR_DESCRIPTION;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.tourDescriptionModel = new TourDescriptionModel();
        this.tourDescriptionModel.tourId = this.tour?.id
        this.form = this.formBuilder.group(new TourDescriptionModel());
        this.form.patchValue(this.tourDescriptionModel);

        this.loadTourDescription();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadTourDescription() {
        const subscription = this.restService.getByTourId(this.tour?.id).subscribe((response) => {
            if (response) {
                this.tourDescriptionModel = response;
                this.form.patchValue(this.tourDescriptionModel);
            }
        });
        this.subscriptions.push(subscription);
    }

    onDelete() {
        let subscription = this.restService.delete(this.tourDescriptionModel.id).subscribe(() => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
            this.tourDescriptionModel = new TourDescriptionModel();
            this.tourDescriptionModel.tourId = this.tour?.id;
            this.form.patchValue(this.tourDescriptionModel);
        });
        this.subscriptions.push(subscription);
    }

    onSave() {
        let subscription = this.restService.save(this.form.value).subscribe(
            response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "Kayıt başarıyla kaydedildi."
                });

                this.tourDescriptionModel = response;
                this.form.patchValue(this.tourDescriptionModel);
            }
        );
        this.subscriptions.push(subscription);
    }

    get FormMode() {
        return FormMode;
    }
}
