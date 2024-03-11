import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {FormMode} from "../../common/enum/form-mode";
import {ActivityModel} from "../model/activity-model";
import {Subscription} from "rxjs";
import {MessageService, SharedModule} from "primeng/api";
import {CurrencyPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {BoxModel} from "../../../ui-shared/ui-util/model/box-model";
import {PageCode} from '../../common/enum/page-code';
import {FileUploadModule} from "primeng/fileupload";
import {Util} from "../../common/util/util";
import {ActivityRestService} from "../service/activity-rest-service";
import {
    ActivityDescriptionPageComponent
} from "./boxes/activity-description/component/activity-description-page.component";
import {ActivityGalleryPageComponent} from "./boxes/activity-gallery/component/activity-gallery-page.component";
import {ActivityGalleryPreviewComponent} from "./boxes/activity-gallery/component/activity-gallery-preview.component";


@Component({
    selector: 'app-activity-form',
    standalone: true,
    imports: [
        NgStyle,
        ButtonModule,
        CurrencyPipe,
        MenuModule,
        SharedModule,
        TableModule,
        FormsModule,
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
        NgForOf,
        FileUploadModule,
        ActivityDescriptionPageComponent,
        ActivityGalleryPageComponent,
        ActivityGalleryPreviewComponent,
    ],
    templateUrl: './activity-form.component.html',
})
export class ActivityFormComponent implements OnInit, OnDestroy {

    @Input() activity: ActivityModel;
    @Output() eventSave = new EventEmitter();
    @Output() eventCancel = new EventEmitter();

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    subscriptions: Subscription[];
    boxList: BoxModel[];
    selectedBox: BoxModel;

    constructor(
        private formBuilder: FormBuilder,
        private restService: ActivityRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        if (!this.activity)
            this.activity = new ActivityModel();

        this.pageCode = PageCode.ACTIVITY_FORM;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.boxList = [];
        this.selectedBox = null;
        this.activity = Util.clone<ActivityModel>(ActivityModel, this.activity);

        this.buildForm();
        this.initializeBoxes();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    clone<T>(TCreator: { new(): T }, model: T): T {
        return Object.assign(new TCreator(), structuredClone(model));
    }

    buildForm() {
        this.form = this.formBuilder.group(new ActivityModel());
        this.form.patchValue(this.activity);
    }

    onCancel() {
        this.eventCancel.emit();
    }

    onSave() {
        let apiModel: ActivityModel = this.form.value;

        let subscription = this.restService.save(apiModel).subscribe(
            response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "İşlem başarıyla kaydedildi."
                });
                this.activity = response;
                this.boxList?.forEach(box => box.disabled = false);
                this.form.patchValue(this.activity);
                this.eventSave.emit();
            }
        );
        this.subscriptions.push(subscription);
    }

    get FormMode() {
        return FormMode;
    }

    initializeBoxes() {
        this.boxList = [];
        this.boxList.push(new BoxModel(PageCode.ACTIVITY_DESCRIPTION, "Açıklamalar", !this.activity?.id));
        this.boxList.push(new BoxModel(PageCode.ACTIVITY_GALLERY, "Galeri", !this.activity?.id));
        this.boxList.push(new BoxModel(PageCode.ACTIVITY_GALLERY_PREVIEW, "Galeri Preview", !this.activity?.id));
    }

    onSelect(box?: BoxModel) {
        if (box.disabled)
            return;

        if (box.pageCode) this.selectedBox = box;
    }

    get PageCode() {
        return PageCode;
    }

    onBack() {
        this.selectedBox = null;
    }
}
