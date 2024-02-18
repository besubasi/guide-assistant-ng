import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldFileUpload } from './file-upload.type';
import { HvlFormItemModule, HvlFormMessageModule } from '@hvlng/framework-core/form';
import { FormlyFormFieldModule } from '../form-field/form-field.module';
import { FileUploadModule } from 'primeng/fileupload';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
    declarations: [FormlyFieldFileUpload],
    imports: [
        CommonModule,
        HvlFormItemModule,
        ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' }),
        FileUploadModule,
        FormlyFormFieldModule,
        HvlFormItemModule,
        HvlFormMessageModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'fileupload',
                    component: FormlyFieldFileUpload,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormDesignerFileUploadModule {}
