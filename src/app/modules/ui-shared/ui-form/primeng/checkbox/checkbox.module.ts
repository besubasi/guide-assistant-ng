import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { FormlyFieldCheckbox } from './checkbox.type';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyFieldCheckbox],
    imports: [
        CommonModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        CheckboxModule,
        FormlyFormFieldModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'checkbox',
                    component: FormlyFieldCheckbox,
                    wrappers: ['form-field'],
                },
                {
                    name: 'boolean',
                    extends: 'checkbox',
                },
            ],
        }),
    ],
})
export class FormDesignerCheckboxModule {}
