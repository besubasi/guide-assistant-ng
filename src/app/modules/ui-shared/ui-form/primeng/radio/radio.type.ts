import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormlyFieldProps } from '../form-field/form-field.wrapper';
import { FieldArrayTypeConfig, FieldType, FormlyFieldConfig } from '@ngx-formly/core';

interface RadioProps extends FormlyFieldProps {}

export interface FormlyRadioFieldConfig extends FormlyFieldConfig<RadioProps> {
    type: 'radio' | Type<FormlyFieldRadio>;
}

@Component({
    selector: 'formly-field-primeng-radio',
    template: `
        <div class="p-field-radiobutton" *ngFor="let option of props.options | formlySelectOptions: field | async">
            <p-radioButton
                [name]="field.name || id"
                [formControl]="option.disabled ? disabledControl : formControl"
                [label]="option.label"
                [value]="option.value"
            >
            </p-radioButton>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldRadio extends FieldType<FieldArrayTypeConfig<RadioProps>> {
    get disabledControl() {
        return new UntypedFormControl({ value: this.formControl.value, disabled: true });
    }
}
