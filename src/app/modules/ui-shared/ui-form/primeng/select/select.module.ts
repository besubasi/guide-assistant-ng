import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormlyFieldSelect } from './select.type';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from './formly-select.module';

@NgModule({
    declarations: [FormlyFieldSelect],
    imports: [
        CommonModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        DropdownModule,
        FormlyFormFieldModule,
        FormlySelectModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'select',
                    component: FormlyFieldSelect,
                    wrappers: ['form-field'],
                },
                { name: 'enum', extends: 'select' },
            ],
        }),
    ],
})
export class FormDesignerSelectModule {}
