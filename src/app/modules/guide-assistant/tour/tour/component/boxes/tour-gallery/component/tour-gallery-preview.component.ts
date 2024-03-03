import {Component, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {GalleriaModule} from "primeng/galleria";
import {TourGalleryModel} from "../model/tour-gallery-model";
import {Subscription} from "rxjs";
import {TourGalleryRestService} from "../service/tour-gallery-rest-service";
import {PageCode} from "../../../../../../common/enum/page-code";
import {FormMode} from 'src/app/modules/guide-assistant/common/enum/form-mode';
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
    selector: 'app-tour-gallery-preview',
    standalone: true,
    imports: [
        GalleriaModule
    ],
    templateUrl: './tour-gallery-preview.component.html',
    styleUrl: './tour-gallery-preview.component.scss'
})
export class TourGalleryPreviewComponent implements OnInit, OnDestroy {

    @Input() tourId: number;
    @Input() numVisible: number;

    pageCode: string;
    formMode: string;
    list: TourGalleryModel[];
    subscriptions: Subscription[];

    constructor(
        private restService: TourGalleryRestService,
        @Optional() private dialogConfig: DynamicDialogConfig,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.TOUR_GALLERY_PREVIEW;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.list = [];

        if (!this.tourId)
            this.tourId = this.dialogConfig?.data?.tourId ?? null;
        if (!this.numVisible)
            this.numVisible = this.dialogConfig?.data?.numVisible ?? 4;

        this.loadData();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadData() {
        if (!this.tourId)
            return;

        const subscription = this.restService.getListByTourId(this.tourId).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    get FormMode() {
        return FormMode;
    }
}
