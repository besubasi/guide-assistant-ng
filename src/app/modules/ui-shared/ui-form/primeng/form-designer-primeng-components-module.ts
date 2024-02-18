import { NgModule } from '@angular/core';
import { FormDesignerCheckboxModule } from './checkbox/checkbox.module';
import { FormDesignerDatepickerModule } from './datepicker/datepicker.module';
import { FormDesignerInputModule } from './input/input.module';
import { FormDesignerRadioModule } from './radio/radio.module';
import { FormDesignerSelectModule } from './select/select.module';
import { FormDesignerTextAreaModule } from './textarea/textarea.module';
import { FormlyFieldInput } from './input/input.type';
import { FormlyFieldRadio } from './radio/radio.type';
import { FormlyFieldCheckbox } from './checkbox/checkbox.type';
import { FormlyFieldDatepicker } from './datepicker/datepicker.type';
import { FormlyFieldSelect } from './select/select.type';
import { FormlyFieldTextArea } from './textarea/textarea.type';
import { FormlyWrapperFormField } from './form-field/form-field.wrapper';
import { FormDesignerFileUploadModule } from './file-upload/file-upload.module';
import { FormlyFieldFileUpload } from './file-upload/file-upload.type';
import { FormDesignerNumberModule } from './number/number.module';
import { FormlyFieldNumber } from './number/number.type';

@NgModule({
    declarations: [],
    imports: [
        FormDesignerCheckboxModule,
        FormDesignerDatepickerModule,
        FormDesignerInputModule,
        FormDesignerRadioModule,
        FormDesignerSelectModule,
        FormDesignerTextAreaModule,
        FormDesignerFileUploadModule,
        FormDesignerNumberModule,
    ],
    exports: [
        FormDesignerCheckboxModule,
        FormDesignerDatepickerModule,
        FormDesignerInputModule,
        FormDesignerRadioModule,
        FormDesignerSelectModule,
        FormDesignerTextAreaModule,
        FormDesignerFileUploadModule,
        FormDesignerNumberModule,
    ],
})
export class FormDesignerPrimengComponentsModule {}

export const FormDesignerWrappers = [
    {
        name: 'form-field',
        component: FormlyWrapperFormField,
    },
];

export const FormDesignerTypes = [
    {
        name: 'input',
        component: FormlyFieldInput,
        wrappers: ['form-field'],
    },
    {
        name: 'number',
        extends: 'input',
        defaultOptions: {
            props: {
                type: 'number',
            },
        },
    },
    { name: 'string', extends: 'input' },
    {
        name: 'decimal',
        component: FormlyFieldNumber,
        wrappers: ['form-field'],
    },
    {
        name: 'radio',
        component: FormlyFieldRadio,
        wrappers: ['form-field'],
    },
    {
        name: 'checkbox',
        component: FormlyFieldCheckbox,
        wrappers: ['form-field'],
    },
    {
        name: 'boolean',
        extends: 'checkbox',
    },
    {
        name: 'datepicker',
        component: FormlyFieldDatepicker,
        wrappers: ['form-field'],
    },
    {
        name: 'select',
        component: FormlyFieldSelect,
        wrappers: ['form-field'],
    },
    { name: 'enum', extends: 'select' },
    {
        name: 'textarea',
        component: FormlyFieldTextArea,
        wrappers: ['form-field'],
    },
    {
        name: 'fileupload',
        component: FormlyFieldFileUpload,
        wrappers: ['form-field'],
    },
];
