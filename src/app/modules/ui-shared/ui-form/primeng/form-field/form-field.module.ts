import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyWrapperFormField } from './form-field.wrapper';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyWrapperFormField],
    imports: [
        CommonModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            wrappers: [
                {
                    name: 'form-field',
                    component: FormlyWrapperFormField,
                },
            ],
        }),
    ],
    exports: [FormlyWrapperFormField],
})
export class FormlyFormFieldModule {}
