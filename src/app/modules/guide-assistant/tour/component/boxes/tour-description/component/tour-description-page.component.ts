import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';

import {EditorModule} from 'primeng/editor';
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {
    UiFormFooterButtonsModule
} from "../../../../../../ui-shared/ui-form-footer-buttons/ui-form-footer-buttons.module";
import {TourSaveModel} from "../../../../model/tour-save-model";
import {TourDescriptionRestService} from "../service/tour-description-rest-service";
import {PageCode} from "../../../../../common/enum/page-code";
import {TourDescriptionModel} from "../model/tour-description-model";

@Component({
    selector: 'app-tour-description-page',
    templateUrl: './tour-description-page.component.html',
    standalone: true,
    imports: [
        EditorModule,
        FormsModule,
        ReactiveFormsModule,
        UiFormFooterButtonsModule
    ]
})
export class TourDescriptionPageComponent implements OnInit {

    @Input() tour: TourSaveModel;

    pageCode: string;
    form: UntypedFormGroup;
    subscriptions: Subscription[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: TourDescriptionRestService,
        private messageService: MessageService,
    ) {
    }


    ngOnInit() {
        this.pageCode = PageCode.TOUR_DESCRIPTION;
        this.subscriptions = [];
        this.form = this.formBuilder.group(new TourDescriptionModel());
        this.form.patchValue({tourId: this.tour?.id});
        this.loadTourDescription();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadTourDescription() {
        if (!this.tour?.id)
            return;

        const subscription = this.restService.getByTourId(this.tour.id).subscribe((response) => {
            if (response) {
                this.form.patchValue(response);
            }
        });
        this.subscriptions.push(subscription);
    }

    onDelete() {
        if (!this.form?.value?.id)
            return;

        let subscription = this.restService.deleteById(this.form?.value?.id).subscribe(() => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
            const model = new TourDescriptionModel();
            model.tourId = this.tour?.id;
            this.form.patchValue(model);
        });
        this.subscriptions.push(subscription);
    }

    onSave() {
        let subscription = this.restService.save(this.form.value).subscribe(
            response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "İşlem başarıyla kaydedildi."
                });
                this.form.patchValue(response);
            }
        );
        this.subscriptions.push(subscription);
    }

}
