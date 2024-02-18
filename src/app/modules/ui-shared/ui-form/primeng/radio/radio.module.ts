import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormlyFieldRadio } from './radio.type';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlySelectModule } from '../select/formly-select.module';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyFieldRadio],
    imports: [
        CommonModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        RadioButtonModule,
        FormlyFormFieldModule,
        FormlySelectModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'radio',
                    component: FormlyFieldRadio,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormDesignerRadioModule {}
