import { Component } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps as CoreFormlyFieldProps } from '@ngx-formly/core';

export interface FormlyFieldProps extends CoreFormlyFieldProps {
    hideRequiredMarker?: boolean;
    hideLabel?: boolean;
}
// form elemanlarının tamamı bu wrapper ile sarılıdır. genel form item düzenlemeleri buradan yapılır
@Component({
    selector: 'formly-wrapper-primeng-form-field',
    template: `<hvl-form-item [key]="field.key" [label]="check(field)">
        <ng-container #fieldComponent></ng-container>
    </hvl-form-item> `,
})
export class FormlyWrapperFormField extends FieldWrapper<FormlyFieldConfig<FormlyFieldProps>> {
    check(field) {
        if (field.type === 'checkbox') {
            return '';
        } else {
            return this.props.label;
        }
    }
}
