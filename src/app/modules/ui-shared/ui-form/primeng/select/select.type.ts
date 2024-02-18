import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldArrayTypeConfig, FieldType, FormlyFieldConfig } from '@ngx-formly/core';

export interface FormlySelectFieldConfig extends FormlyFieldConfig<any> {
    type: 'select' | Type<FormlyFieldSelect>;
}

@Component({
    selector: 'formly-field-primeng-select',
    template: `
        <p-dropdown
            [placeholder]="props.placeholder"
            [options]="props.options | formlySelectOptions: field | async"
            [formControl]="formControl"
            [formlyAttributes]="field"
            [showClear]="!props.required"
            (onChange)="props.change && props.change(field, $event)"
        >
        </p-dropdown>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelect extends FieldType<FieldArrayTypeConfig<any>> {}
