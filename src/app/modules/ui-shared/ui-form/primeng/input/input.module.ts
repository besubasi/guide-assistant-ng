import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormlyFieldInput } from './input.type';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyFieldInput],
    imports: [
        CommonModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        InputTextModule,
        FormlyFormFieldModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'input',
                    component: FormlyFieldInput,
                    wrappers: ['form-field'],
                },
                { name: 'string', extends: 'input' },
                {
                    name: 'number',
                    extends: 'input',
                    defaultOptions: {
                        props: {
                            type: 'number',
                        },
                    },
                },
                {
                    name: 'integer',
                    extends: 'input',
                    defaultOptions: {
                        props: {
                            type: 'number',
                        },
                    },
                },
            ],
        }),
    ],
})
export class FormDesignerInputModule {}
