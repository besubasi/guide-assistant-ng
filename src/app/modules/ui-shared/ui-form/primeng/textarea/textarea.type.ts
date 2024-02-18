import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FormlyFieldProps } from '../form-field/form-field.wrapper';
import { FieldArrayTypeConfig, FieldType, FormlyFieldConfig } from '@ngx-formly/core';

interface TextAreaProps extends FormlyFieldProps {}

export interface FormlyTextAreaFieldConfig extends FormlyFieldConfig<TextAreaProps> {
    type: 'textarea' | Type<FormlyFieldTextArea>;
}

@Component({
    selector: 'formly-field-primeng-textarea',
    template: ` <textarea [formControl]="formControl" [formlyAttributes]="field" pInputTextarea></textarea> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextArea extends FieldType<FieldArrayTypeConfig<TextAreaProps>> {}
