import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FormlyFieldProps } from '../form-field/form-field.wrapper';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';

interface InputProps extends FormlyFieldProps {}

export interface FormlyInputFieldConfig extends FormlyFieldConfig<InputProps> {
    type: 'input' | Type<FormlyFieldInput>;
}

@Component({
    selector: 'formly-field-primeng-input',
    template: `
        <input
            *ngIf="props.type !== 'number'; else numberTmp"
            pInputText
            [type]="props.type || 'text'"
            [formControl]="formControl"
            [formlyAttributes]="field"
        />
        <ng-template #numberTmp>
            <input type="number" pInputText [formControl]="formControl" [formlyAttributes]="field" />
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldInput extends FieldType<FieldTypeConfig<InputProps>> {}
