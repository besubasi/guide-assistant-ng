import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {FormMode} from "../../../common/enum/form-mode";
import {Subscription} from "rxjs";
import {TourTypeModel} from "../../tour-type/model/tour-type-model";
import {TourRestService} from "../service/tour-rest-service";
import {MessageService, SharedModule} from "primeng/api";
import {TourSaveModel} from "../model/tour-save-model";
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
import {UiSharedModule} from "../../../../ui-shared/ui-shared.module";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {BoxModel} from "../../../../ui-shared/ui-util/model/box-model";
import {PageCode} from '../../../common/enum/page-code';
import {TourCalendarPageComponent} from "./boxes/tour-calendar/component/tour-calendar-page.component";
import {
    TourDayDescriptionPageComponent
} from "./boxes/tour-day-description/component/tour-day-description-page.component";
import {TourDescriptionPageComponent} from "./boxes/tour-description/component/tour-description-page.component";
import {TourGalleryPageComponent} from "./boxes/tour-gallery/component/tour-gallery-page.component";
import {TourGalleryPreviewComponent} from "./boxes/tour-gallery/component/tour-gallery-preview.component";
import {FileUploadModule} from "primeng/fileupload";
import {Util} from "../../../common/util/util";
import {LookupModel} from "../../../common/model/lookup-model";
import {TourActivityRelPageComponent} from "./boxes/tour-activity/component/tour-activity-rel-page.component";


@Component({
    selector: 'app-tour-form',
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
        TourCalendarPageComponent,
        TourDayDescriptionPageComponent,
        TourDescriptionPageComponent,
        TourGalleryPageComponent,
        NgForOf,
        TourGalleryPreviewComponent,
        FileUploadModule,
        TourActivityRelPageComponent,
    ],
    templateUrl: './tour-form.component.html',
})
export class TourFormComponent implements OnInit, OnDestroy {

    @Input() tour: TourSaveModel;
    @Input() companyList: LookupModel[];
    @Input() allTourTypeList: TourTypeModel[];
    @Output() eventSave = new EventEmitter();
    @Output() eventCancel = new EventEmitter();

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    subscriptions: Subscription[];
    tourTypeList: TourTypeModel[];
    boxList: BoxModel[];
    selectedBox: BoxModel;

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        if (!this.tour)
            this.tour = new TourSaveModel();

        this.pageCode = PageCode.TOUR_FORM;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.tourTypeList = [];
        this.boxList = [];
        this.selectedBox = null;
        this.tour = Util.clone<TourSaveModel>(TourSaveModel, this.tour);

        this.buildForm();
        this.initializeBoxes();
        this.onChangeCompany();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new TourSaveModel());
        this.form.patchValue(this.tour);
    }

    onChangeCompany() {
        this.form.patchValue({tourTypeId: null});
        if (this.form.value.companyId) {
            this.tourTypeList = this.allTourTypeList?.filter(x => x.companyId == this.form.value.companyId);
        } else {
            this.tourTypeList = this.allTourTypeList;
        }
    }

    onCancel() {
        this.eventCancel.emit();
    }

    onSave() {
        let subscription = this.restService.save(this.form.value).subscribe(
            response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "İşlem başarıyla kaydedildi."
                });
                this.tour = response;
                this.boxList?.forEach(box => box.disabled = false);
                this.form.patchValue(this.tour);
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
        this.boxList.push(new BoxModel(PageCode.TOUR_DESCRIPTION, "Açıklamalar", !this.tour?.id));
        this.boxList.push(new BoxModel(PageCode.TOUR_DAY_DESCRIPTION, "Günlük Detaylar", !this.tour?.id));
        this.boxList.push(new BoxModel(PageCode.TOUR_GALLERY, "Galeri", !this.tour?.id));
        this.boxList.push(new BoxModel(PageCode.TOUR_ACTIVITY_REL, "Aktiviteler", !this.tour?.id));
        this.boxList.push(new BoxModel(PageCode.TOUR_CALENDAR, "Tarihler", !this.tour?.id));
        this.boxList.push(new BoxModel(PageCode.TOUR_GALLERY_PREVIEW, "Foto Preview", !this.tour?.id));
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
