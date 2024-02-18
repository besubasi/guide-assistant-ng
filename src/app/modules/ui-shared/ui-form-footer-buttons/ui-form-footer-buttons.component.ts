import { Component, Input, Output, EventEmitter, signal, WritableSignal } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'ui-form-footer-buttons',
    templateUrl: './ui-form-footer-buttons.component.html',
})
/**
 * Sadece formların footerında yer alan buton grubu olarak kullanılır.
 * Not: Crud ekranların işlem butonları için kullanılmaz.
 */
export class UiFormFooterButtonsComponent {
    loadingDefaultButton = signal(false);
    loadingOk = signal(false);
    loadingNext = signal(false);
    loadingSave = signal(false);

    @Input() showCancel = false;
    @Input() showSave = false;
    @Input() showRemove = false;
    @Input() showChoose = false;
    @Input() showNext = false;
    @Input() showOk = false;
    @Input() showEdit = false;
    @Input() showDefaultButton = false;
    @Input() customContent = false;
    @Input() idPrefix: string;
    @Input() enterSubmit = true;

    @Input() cancelButtonDisabled: boolean;
    @Input() saveButtonDisabled: boolean;
    @Input() removeButtonDisabled: boolean;
    @Input() chooseButtonDisabled: boolean;
    @Input() nextButtonDisabled: boolean;
    @Input() okButtonDisabled: boolean;
    @Input() editButtonDisabled: boolean;
    @Input() defaultButtonDisabled: boolean;
    @Input() discardValidator: boolean = false;

    /**
     * NOT: form inputunun sürekli dinlenmesi ihtiyacı, özellikle cascade form elemanlarının zorunlu form itemları forma dahil olduğunda
     * form validasyonunun, sonradan required olarak eklenen form elemanının validasyonunu da görmesi için yapıldı.
     */
    private _form: UntypedFormGroup | Array<UntypedFormGroup>;
    @Input() set form(value: UntypedFormGroup | Array<UntypedFormGroup>) {
        if (value === this._form) return;
        this._form = value;
    }

    get form(): UntypedFormGroup | Array<UntypedFormGroup> {
        return this._form;
    }

    @Input() saveButtonLabel: string;
    @Input() defaultButtonLabel: string;

    @Output() onCancel = new EventEmitter();
    @Output() onSave = new EventEmitter();
    @Output() onRemove = new EventEmitter();
    @Output() onChoose = new EventEmitter();
    @Output() onNext = new EventEmitter();
    @Output() onOk = new EventEmitter();
    @Output() onEdit = new EventEmitter();
    @Output() onDefaultButton = new EventEmitter();

    handleCancel() {
        this.onCancel.emit();
    }

    handleSave() {
        this.loadingSave.set(true);
        this.timeout(this.loadingSave);

        if (Array.isArray(this.form)) {
            this.form.forEach((objForm) => {
                this.setValidatorOrEmit(objForm);
            });
        } else {
            this.setValidatorOrEmit(this.form);
        }
    }

    setValidatorOrEmit(group: UntypedFormGroup | UntypedFormArray) {
        if (this.discardValidator) {
            this.onSave.emit();
            this.checkAndClearDraftData();
        } else {
            if (group && group.invalid) {
                this.uiClientSideValidator(group);
            } else {
                this.onSave.emit();
                this.checkAndClearDraftData();
            }
        }
    }

    uiClientSideValidator(group: UntypedFormGroup | UntypedFormArray) {
        group.markAsDirty();
        Object.keys(group.controls).forEach((key: string) => {
            if (group.controls[key].status === 'INVALID') {
                console.log(key, 'is invalid!');
            }
            const abstractControl = group.controls[key];
            if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
                this.uiClientSideValidator(abstractControl);
            } else {
                abstractControl.markAsDirty();
            }
        });
    }

    handleRemove() {
        this.onRemove.emit();
    }

    handleChoose() {
        this.onChoose.emit();
    }

    handleNext() {
        this.loadingNext.set(true);
        this.timeout(this.loadingNext);

        if (this.isFormValid(this.form)) this.onNext.emit();
    }

    handleOk() {
        this.loadingOk.set(true);
        this.timeout(this.loadingOk);

        if (this.isFormValid(this.form)) this.onOk.emit();
    }

    handleEdit() {
        this.onEdit.emit();
    }

    handleDefaultButton() {
        this.loadingDefaultButton.set(true);
        this.timeout(this.loadingDefaultButton);

        this.onDefaultButton.emit();
    }

    isFormValid(form: UntypedFormGroup | UntypedFormArray | Array<UntypedFormGroup>) {
        if (!form) return true;

        let isValid: boolean = true;
        if (Array.isArray(form)) {
            form.forEach((x) => {
                if (!this.isFormValid(x)) {
                    isValid = false;
                    this.uiClientSideValidator(x);
                }
            });
        } else {
            if (form.invalid) {
                isValid = false;
                this.uiClientSideValidator(form);
            }
        }
        return isValid;
    }

    timeout(loader: WritableSignal<boolean>) {
        return setTimeout(() => {
            loader.set(false);
        }, 1500);
    }

    checkAndClearDraftData() {
        if (this.idPrefix && localStorage.getItem('KOVAN_DRAFTFORM_' + this.idPrefix)) {
            localStorage.removeItem('KOVAN_DRAFTFORM_' + this.idPrefix);
        }
    }
}
