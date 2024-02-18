import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FormlyFieldDatepicker } from './datepicker.type';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyFieldDatepicker],
    imports: [
        CommonModule,
        HvlFormItemModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        CalendarModule,
        FormlyFormFieldModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'datepicker',
                    component: FormlyFieldDatepicker,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormDesignerDatepickerModule {}
