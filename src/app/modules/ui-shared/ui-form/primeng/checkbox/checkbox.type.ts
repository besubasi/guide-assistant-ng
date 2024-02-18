import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import{ FieldType, FieldTypeConfig, FormlyFieldConfig} from '@ngx-formly/core' 

export interface FormlyCheckboxFieldConfig extends FormlyFieldConfig<any> {
  type: 'checkbox' | Type<FormlyFieldCheckbox>;
}

@Component({
  selector: 'formly-field-primeng-checkbox',
  template: `
    <div class="p-field-checkbox">
      <p-checkbox
        [binary]="true"
        [label]="props.label"
        [formControl]="formControl"
        [formlyAttributes]="field"
        (onChange)="props.change && props.change(field, $event)"
      >
      </p-checkbox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldCheckbox extends FieldType<FieldTypeConfig<any>> {
  override defaultOptions = {
    props: {
      hideLabel: true,
    },
  };
}
