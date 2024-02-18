import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormlyFieldTextArea } from './textarea.type';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyFieldTextArea],
    imports: [
        CommonModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        InputTextareaModule,
        FormlyFormFieldModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'textarea',
                    component: FormlyFieldTextArea,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormDesignerTextAreaModule {}
