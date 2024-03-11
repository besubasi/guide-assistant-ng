import {Component, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {GalleriaModule} from "primeng/galleria";
import {Subscription} from "rxjs";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

import {ActivityGalleryModel} from "../model/activity-gallery-model";
import {ActivityGalleryRestService} from "../service/activity-gallery-rest-service";
import {PageCode} from "../../../../../common/enum/page-code";
import {FormMode} from "../../../../../common/enum/form-mode";

@Component({
    selector: 'app-activity-gallery-preview',
    standalone: true,
    imports: [
        GalleriaModule
    ],
    templateUrl: './activity-gallery-preview.component.html',
})
export class ActivityGalleryPreviewComponent implements OnInit, OnDestroy {

    @Input() activityId: number;
    @Input() numVisible: number;

    pageCode: string;
    formMode: string;
    list: ActivityGalleryModel[];
    subscriptions: Subscription[];

    constructor(
        private restService: ActivityGalleryRestService,
        @Optional() private dialogConfig: DynamicDialogConfig,
    ) {
    }

    ngOnInit() {
        this.pageCode = PageCode.ACTIVITY_GALLERY_PREVIEW;
        this.formMode = FormMode.NONE;
        this.subscriptions = [];
        this.list = [];

        if (!this.activityId)
            this.activityId = this.dialogConfig?.data?.activityId ?? null;
        if (!this.numVisible)
            this.numVisible = this.dialogConfig?.data?.numVisible ?? 4;

        this.loadData();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadData() {
        if (!this.activityId)
            return;

        const subscription = this.restService.getListByActivityId(this.activityId).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    get FormMode() {
        return FormMode;
    }
}
