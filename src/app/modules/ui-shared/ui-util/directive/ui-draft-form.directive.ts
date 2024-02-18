import { AfterViewInit, Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { UiTranslateLoaderService } from '../service/ui-translate-loader';
import { JsonConvert } from 'json2typescript';

@Directive({
    selector: '[uiDraftForm]',
})
export class UiDraftFormDirective implements AfterViewInit, OnDestroy {
    private _areUChecked = false;

    /** @description form */

    private _form: FormGroup;
    @Input() set form(value: FormGroup) {
        if (value === this._form) return;
        this._form = value;
    }
    get form(): FormGroup {
        return this._form;
    }

    /** @description formMode */
    private _formMode: string;
    @Input() set formMode(value: string) {
        if (value === this._formMode) return;
        this._formMode = value;
    }
    get formMode(): string {
        return this._formMode;
    }

    @Input() model: any;
    @Input() pageCode: string;

    subscriptions: Subscription[] = [];

    @Output() onAfterSaveDraftData = new EventEmitter();

    constructor(
        private confirmationService: ConfirmationService,
        private translater: UiTranslateLoaderService,
    ) {}

    ngOnInit() {
        if (this.formMode === 'add') {
            this.check();
        }
    }

    ngAfterViewInit() {
        if (this.formMode === 'add') {
            this.watchAndWrite();
        }
    }

    check() {
        if (!this._areUChecked) {
            if (this.checkDraftData(this.pageCode)) {
                this._areUChecked = true;
                setTimeout(() => {
                    this.showDraftData(this.pageCode, this.form);
                }, 1000);
            }
        }
    }

    watchAndWrite() {
        setTimeout(() => {
            this.subscriptions.push(
                this.form.valueChanges.subscribe((result: any) => {
                    result.id = null;
                    localStorage.setItem('KOVAN_DRAFTFORM_' + this.pageCode, JSON.stringify(result));
                }),
            );
        }, 1000);
    }

    showDraftData(pageCode, form) {
        this.confirmationService.confirm({
            header: 'Taslak Veriniz Var',
            message:
                'Daha önceden oluşturulmuş ancak kaydedilmemiş veriniz var. Taslak veriden devam etmek ister misiniz?',
            acceptLabel: this.translater.instant('button.accept'),
            rejectLabel: this.translater.instant('button.cancel'),
            acceptButtonStyleClass: 'confirm-dialog-add-accept',
            rejectButtonStyleClass: 'p-button-text',
            acceptIcon: '',
            rejectIcon: '',
            accept: () => {
                this.setDraftData(pageCode, form);
            },
            reject: () => {
                this.clearDraftData(pageCode);
            },
        });
    }

    setDraftData(pageCode: string, form: FormGroup) {
        let draftFormString = localStorage.getItem('KOVAN_DRAFTFORM_' + pageCode);
        let draftFormData;
        if (draftFormString) {
            draftFormData = JSON.parse(draftFormString);

            const converter = new JsonConvert();
            let data = converter.deserializeObject(draftFormData, this.model);

            form.patchValue(data);

            this.onAfterSaveDraftData.emit();
        }
    }

    checkDraftData(pageCode: string) {
        let draftFormString = localStorage.getItem('KOVAN_DRAFTFORM_' + pageCode);

        if (draftFormString) {
            return true;
        } else {
            return false;
        }
    }

    clearDraftData(pageCode: string) {
        localStorage.removeItem('KOVAN_DRAFTFORM_' + pageCode);
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((x) => x.unsubscribe());
    }
}
