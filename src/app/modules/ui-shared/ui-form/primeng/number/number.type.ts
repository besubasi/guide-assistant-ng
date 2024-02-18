import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';

interface InputNumberProps extends FormlyFieldProps {
    mode?: string;
    prefix?: string;
    suffix?: string;
    currencyDisplay?: string;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    step?: number;
    size?: number;
    min?: number;
    max?: number;
    format?: boolean;
    currency?: string;
}

export interface FormlyNumberFieldConfig extends FormlyFieldConfig<InputNumberProps> {
    type: 'decimal' | Type<FormlyFieldNumber>;
}

@Component({
    selector: 'formly-field-primeng-decimal',
    template: `
        <p-inputNumber
            [formControl]="formControl"
            [formlyAttributes]="field"
            [mode]="props.mode"
            [minFractionDigits]="props.minFractionDigits"
            [maxFractionDigits]="props.maxFractionDigits"
            [step]="props.step"
            [prefix]="props.prefix"
            [suffix]="props.suffix"
            [min]="props.min"
            [max]="props.max"
            [size]="props.size"
        ></p-inputNumber>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldNumber extends FieldType<FieldTypeConfig<InputNumberProps>> {}
