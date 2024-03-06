import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {TourGalleryRestService} from "../service/tour-gallery-rest-service";
import {TourSaveModel} from "../../../../model/tour-save-model";
import {PageCode} from "../../../../../../common/enum/page-code";
import {TourGalleryModel} from "../model/tour-gallery-model";
import {EditorModule} from "primeng/editor";
import {TableModule} from "primeng/table";
import {
    UiActiveInactiveTagsModule
} from "../../../../../../../ui-shared/ui-active-inactive-tags/ui-active-inactive-tags.module";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ModalConfig} from "../../../../../../../ui-shared/ui-util/model/modal-config";
import {TourGalleryPreviewComponent} from "./tour-gallery-preview.component";
import {DialogService} from 'primeng/dynamicdialog';
import {FileUploadModule} from "primeng/fileupload";

@Component({
    selector: 'app-tour-gallery-page',
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
        FileUploadModule
    ],
    templateUrl: './tour-gallery-page.component.html',
    styleUrl: './tour-gallery-page.component.scss'
})
export class TourGalleryPageComponent implements OnInit, OnDestroy {

    @Input() tour: TourSaveModel;
    @ViewChild('fileCreateContentList') fileCreateContentList: any;
    @ViewChild('fileUpdateContent') fileUpdateContent: any;

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: TourGalleryModel[];
    selection: TourGalleryModel;
    subscriptions: Subscription[];
    isNeedReload: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourGalleryRestService,
        private messageService: MessageService,
        private dialogService: DialogService,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.TOUR_GALLERY;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.isNeedReload = false;

        this.buildForm();
        this.loadData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new TourGalleryModel());
        this.form.patchValue({tourId: this.tour?.id});
    }

    loadData() {
        if (!this.tour?.id) {
            this.list = [];
            return;
        }

        const subscription = this.restService.getListByTourId(this.tour?.id).subscribe((response) => {
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
        if (this.isNeedReload) {
            this.loadData();
            this.isNeedReload = true;
        }
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

    onSelectFiles($event) {
        const fileList: FileList = $event.files;
        if (fileList.length === 0)
            return;

        let startIndex = 0;
        this.list?.forEach(x => startIndex = x.lineNumber > startIndex ? x.lineNumber : startIndex);

        const formData: FormData = new FormData();
        formData.append('tourId', this.tour?.id.toString());
        for (let i = 0; i < fileList.length; i++) {
            let file = fileList[i];
            formData.append('file', file, file.name);
        }
        this.fileCreateContentList.clear();
        this.createContentList(formData);
    }

    createContentList(formData: FormData) {
        let subscription = this.restService.createContentList(formData).subscribe(
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

    onUpdateContent($event) {
        const fileList: FileList = $event.files;
        if (fileList.length === 0)
            return;

        const formData: FormData = new FormData();
        formData.append('id', this.form.value.id.toString());
        let file = fileList[0];
        formData.append('file', file, file.name);
        this.fileUpdateContent.clear();
        this.updateContent(formData);
    }

    updateContent(formData: FormData) {
        let subscription = this.restService.updateContent(formData).subscribe(
            response => {
                this.isNeedReload = true;
                //this.form = this.formBuilder.group(new TourGalleryModel());
                this.form.reset();
                this.selection = response;
                this.form.patchValue(response);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "İçerik başarıyla güncellendi."
                });
            }
        );
        this.subscriptions.push(subscription);
    }

    onPreview() {
        this.dialogService.open(TourGalleryPreviewComponent, {
            width: ModalConfig.MODAL_PANEL_SIZE.LG,
            contentStyle: {
                height: ModalConfig.MODAL_PANEL_SIZE.LG,
                'max-height': ModalConfig.MODAL_MAX_HEIGHT,
                overflow: 'auto',
            },
            closeOnEscape: true,
            data: {
                tourId: this.tour?.id,
                numVisible: 6
            },
        });
    }

    get FormMode() {
        return FormMode;
    }
}
