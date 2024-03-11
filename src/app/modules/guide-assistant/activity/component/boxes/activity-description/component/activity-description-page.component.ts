import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';

// Import PrimeNG modules
import {EditorModule} from 'primeng/editor';
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {
    UiFormFooterButtonsModule
} from "../../../../../../ui-shared/ui-form-footer-buttons/ui-form-footer-buttons.module";
import {ActivityModel} from "../../../../model/activity-model";
import {ActivityDescriptionRestService} from "../service/activity-description-rest-service";
import {PageCode} from "../../../../../common/enum/page-code";
import {ActivityDescriptionModel} from "../model/activity-description-model";

@Component({
    selector: 'app-activity-description-page',
    templateUrl: './activity-description-page.component.html',
    standalone: true,
    imports: [
        EditorModule,
        FormsModule,
        ReactiveFormsModule,
        UiFormFooterButtonsModule
    ]
})
export class ActivityDescriptionPageComponent implements OnInit {

    @Input() activity: ActivityModel;

    pageCode: string;
    form: UntypedFormGroup;
    subscriptions: Subscription[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: ActivityDescriptionRestService,
        private messageService: MessageService,
    ) {
    }


    ngOnInit() {
        this.pageCode = PageCode.ACTIVITY_DESCRIPTION;
        this.subscriptions = [];
        this.form = this.formBuilder.group(new ActivityDescriptionModel());
        this.loadActivityDescription();
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    loadActivityDescription() {
        if (!this.activity?.id)
            return;

        const subscription = this.restService.getByActivityId(this.activity.id).subscribe((response) => {
            this.form.patchValue(response);
        });
        this.subscriptions.push(subscription);
    }

    onDelete() {
        if (!this.form?.value?.id)
            return;

        let subscription = this.restService.deleteById(this.form?.value?.id).subscribe(() => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
            const model = new ActivityDescriptionModel();
            model.activityId = this.activity?.id;
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
