import { Injectable, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { UiTranslateLoaderService } from '../ui-util/service/ui-translate-loader';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UiInputDialogComponent } from '../ui-input-dialog/ui-input-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class UiConfirmationDialogService {
    constructor(
        private confirmationService: ConfirmationService,
        protected translateService: UiTranslateLoaderService,
        public dialogService: DialogService,
    ) {
        this.confirmationService = confirmationService;
        this.translateService = translateService;
    }

    ref: DynamicDialogRef;
    result = false;

    showBasicConfirmDialog(
        headerText,
        messageText,
        acceptCallBack: Function,
        rejectCallBack?: Function,
        rejectVisible?: boolean,
        acceptLabel?: string,
        rejectLabel?: string,
        key?: string,
    ) {
        this.translateService.get(['button.accept', 'button.cancel']).subscribe((p) => {
            this.confirmationService.confirm({
                key: key,
                header: headerText,
                message: messageText,
                rejectVisible: rejectVisible ? rejectVisible : false,
                acceptLabel: acceptLabel ? acceptLabel : this.translateService.instant('button.accept'),
                rejectLabel: rejectLabel ? rejectLabel : this.translateService.instant('button.cancel'),
                acceptButtonStyleClass: 'confirm-dialog-general-accept',
                rejectButtonStyleClass: 'p-button-text',
                acceptIcon: '',
                rejectIcon: '',
                accept: () => {
                    acceptCallBack();
                },
                reject: () => {
                    if (rejectCallBack) {
                        rejectCallBack();
                    }
                },
            });
            return this.result;
        });
    }

    showAddConfirmDialog(acceptCallBack: Function, dialogKey?: string) {
        this.translateService
            .get(['confirm.addConfirmHeader', 'confirm.addConfirmMessage', 'button.accept', 'button.cancel'])
            .subscribe((p) => {
                this.confirmationService.confirm({
                    header: this.translateService.instant('confirm.addConfirmHeader'),
                    message: this.translateService.instant('confirm.addConfirmMessage'),
                    // icon: 'pi pi-exclamation-triangle',
                    acceptLabel: this.translateService.instant('button.accept'),
                    rejectLabel: this.translateService.instant('button.cancel'),
                    acceptButtonStyleClass: 'confirm-dialog-add-accept',
                    rejectButtonStyleClass: 'p-button-text',
                    acceptIcon: '',
                    rejectIcon: '',
                    accept: () => {
                        acceptCallBack();
                    },
                    reject: () => {},
                    key: dialogKey ?? undefined,
                });
                return this.result;
            });
    }

    showDeleteConfirmDialog(acceptCallBack: Function, dialogKey?: string): any {
        this.translateService
            .get(['confirm.addConfirmHeader', 'confirm.addConfirmMessage', 'button.delete', 'button.cancel'])
            .subscribe((p) => {
                this.confirmationService.confirm({
                    header: this.translateService.instant('confirm.deleteConfirmHeader'),
                    message: this.translateService.instant('confirm.deleteConfirmMessage'),
                    // icon: 'pi pi-exclamation-triangle',
                    acceptLabel: this.translateService.instant('button.delete'),
                    rejectLabel: this.translateService.instant('button.cancel'),
                    acceptButtonStyleClass: 'p-button-danger',
                    rejectButtonStyleClass: 'p-button-text',
                    acceptIcon: 'pi pi-trash',
                    rejectIcon: null,
                    accept: () => {
                        acceptCallBack();
                    },
                    reject: () => {},
                    key: dialogKey ?? undefined,
                });
                return this.result;
            });
    }

    showInputDialog(
        acceptCallBack?: Function,
        headerText = this.translateService.instant('button.accept'),
        inputLabel = this.translateService.instant('confirm.comment'),
        rejectVisible = true,
        acceptLabel = this.translateService.instant('button.save'),
        rejectLabel = this.translateService.instant('button.cancel'),
        rejectCallBack?: Function,
        isTextArea = true,
        maxLength = 255,
    ) {
        this.ref = this.dialogService.open(UiInputDialogComponent, {
            header: headerText,
            width: '500px',
            contentStyle: { height: '350px', overflow: 'auto' },
            baseZIndex: 10000,
            data: {
                inputLabel: inputLabel,
                isAccepted: false,
                rejectVisible: rejectVisible,
                acceptLabel: acceptLabel,
                rejectLabel: rejectLabel,
                inputValue: '',
                isTextArea: isTextArea,
                maxLength: maxLength,
            },
        });

        this.ref.onClose.subscribe((data) => {
            if (data && data.isAccepted == true) {
                acceptCallBack(data.inputValue);
            } else if (data && data.isAccepted == false) {
                rejectCallBack();
            }
        });
    }
}
