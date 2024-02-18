import { ChangeDetectionStrategy, Component, Directive, forwardRef, Type } from '@angular/core';
import { FormlyFieldProps } from '../form-field/form-field.wrapper';
import { FileUpload } from 'primeng/fileupload';
import { ControlValueAccessor, UntypedFormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileUploadServiceConfigurationModel } from './file-upload-service-configuration-model';

interface FileUploadProps extends FormlyFieldProps {}

export interface FormlyFileUploadFieldConfig extends FormlyFieldConfig<FileUploadProps> {
    type: 'fileupload' | Type<FormlyFieldFileUpload>;
}

@Directive({
    selector: 'p-fileUpload[formControlName], p-fileUpload[formControl]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadControlValueAccessorDirective),
            multi: true,
        },
    ],
})
export class FileUploadControlValueAccessorDirective implements ControlValueAccessor {
    constructor(private fileUpload: FileUpload) {}

    writeValue(value: any): void {
        // update the model and changes logic goes here
    }

    registerOnChange(fn: any): void {
        // notify the outside world about changes (when the user interacts with the input)
        this.fileUpload.onUpload.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        // here goes the touch logic
        this.fileUpload.onClear.subscribe(fn);
    }

    setDisabledState(isDisabled: boolean) {
        this.fileUpload.disabled = isDisabled;
    }
}

@Component({
    selector: 'formly-field-primeng-fileupload',
    template: `
        <form>
            <p-fileUpload
                #fileUpload
                styleClass="hvl-file-upload"
                chooseLabel="Dosya Ekle"
                [auto]="true"
                multiple="false"
                [showUploadButton]="false"
                [showCancelButton]="true"
                (onUpload)="onUpload($event)"
                [url]="getFileUrl()"
                accept="{{ acceptedFileTypes }}"
                name="file"
                mode="basic"
                maxFileSize="1048576"
                withCredentials="true"
                formControlName="fileUpload"
            ></p-fileUpload>
            <div *ngIf="fileName">{{ fileName }}</div>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadControlValueAccessorDirective),
            multi: true,
        },
    ],
})
export class FormlyFieldFileUpload extends FieldType<FieldTypeConfig<FileUploadProps>> {
    data;
    fileName: string;
    fileUploadServiceConfigurationModel: FileUploadServiceConfigurationModel;
    CONFIG_URL = 'assets/config/config.json';
    acceptedFileTypes = '.pdf, image/*';
    constructor(private fb: UntypedFormBuilder) {
        super();
    }

    async ngOnInit() {
        this.getConfig();
    }

    getFileUrl() {
        return this.fileUploadServiceConfigurationModel?.infra?.service + '/form/formly/saveFile';
    }

    async getConfig() {
        return from(
            fetch(this.CONFIG_URL)
                .then(function (response) {
                    return response.json();
                })
                .catch(() => {
                    //    todo anlamlı exception fırlatılmalı.
                }),
        )
            .pipe(
                map((config) => {
                    this.fileUploadServiceConfigurationModel = config;
                    return;
                }),
            )
            .toPromise();
    }

    onUpload(event: any) {
        if (event.originalEvent.body.body) {
            const savedFileContentId = event.originalEvent.body.body;
            const savedFileName = event.files[0].name;
            const savedFileMimeType = event.files[0].type;
            const savedFileSize = event.files[0].size;
            this.data = { savedFileContentId, savedFileName, savedFileMimeType, savedFileSize };

            let key = this.field.key.toString();
            this.fileName = event.files[0].name;
            this.form.get(key).patchValue(this.data);
        }
    }
}
