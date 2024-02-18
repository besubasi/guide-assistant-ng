import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldNumber } from './number.type';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyFieldNumber],
    imports: [
        CommonModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        InputNumberModule,
        FormlyFormFieldModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'decimal',
                    component: FormlyFieldNumber,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormDesignerNumberModule {}
