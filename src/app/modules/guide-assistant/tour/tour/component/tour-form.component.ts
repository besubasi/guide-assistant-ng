import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {FormMode} from "../../../common/enum/form-mode";
import {TourModel} from "../model/tour-model";
import {Subscription} from "rxjs";
import {CompanyModel} from "../../../company/model/company-model";
import {TourTypeModel} from "../../tourtype/model/tour-type-model";
import {TourRestService} from "../service/tour-rest-service";
import {TourTypeRestService} from "../../tourtype/service/tour-type-rest-service";
import {MessageService, SharedModule} from "primeng/api";
import {TourSaveModel} from "../model/tour-save-model";
import {TourTypeSearchModel} from "../../tourtype/model/tour-type-search-model";
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
import {CompanyRestService} from "../../../company/service/company-rest-service";
import {CompanySearchModel} from "../../../company/model/company-search-model";
import {TourGalleryPreviewComponent} from "./boxes/tour-gallery/component/tour-gallery-preview.component";
import {FileUploadModule} from "primeng/fileupload";
import {Util} from "../../../common/util/util";


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
    ],
    templateUrl: './tour-form.component.html',
    styleUrl: './tour-form.component.scss'
})
export class TourFormComponent implements OnInit, OnDestroy {

    @Input() tour: TourSaveModel;
    @Output() eventSave = new EventEmitter();
    @Output() eventCancel = new EventEmitter();

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    subscriptions: Subscription[];

    companyList: CompanyModel[];
    tourTypeList: TourTypeModel[];

    boxList: BoxModel[];
    selectedBox: BoxModel;

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourRestService,
        private companyService: CompanyRestService,
        private tourTypeService: TourTypeRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        if (!this.tour)
            this.tour = new TourSaveModel();

        this.pageCode = PageCode.TOUR_FORM;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.companyList = [];
        this.tourTypeList = [];
        this.boxList = [];
        this.selectedBox = null;
        this.tour = Util.clone<TourSaveModel>(TourSaveModel, this.tour);

        this.buildForm();
        this.initializeBoxes();
        this.loadCompanyList();
        this.loadTourTypeList();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    clone<T>(TCreator: { new(): T }, model: T): T {
        return Object.assign(new TCreator(), structuredClone(model));
    }

    buildForm() {
        this.form = this.formBuilder.group(new TourSaveModel());
        this.form.patchValue(this.tour);
    }

    loadCompanyList() {
        let searchModel: CompanySearchModel = new CompanySearchModel();
        searchModel.active = true;
        let subscription = this.companyService.getList(searchModel).subscribe((response => {
            this.companyList = response;
            this.companyList?.forEach(x => x.name = x.code + ' - ' + x.name);
        }));
        this.subscriptions.push(subscription);
    }

    loadTourTypeList() {
        let searchModel: TourTypeSearchModel = new TourTypeSearchModel();
        searchModel.companyId = this.form.value.companyId;
        searchModel.active = true;
        let subscription = this.tourTypeService.getList(searchModel).subscribe((response => {
            this.tourTypeList = response;
            console.log(this.tourTypeList)
        }));
        this.subscriptions.push(subscription);
    }

    onChangeCompany() {
        this.form.patchValue({tourTypeId: null});
        this.loadTourTypeList();
    }

    onCancel() {
        this.eventCancel.emit();
    }

    onSave() {
        let apiModel: TourModel = this.form.value;

        let subscription = this.restService.save(apiModel).subscribe(
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