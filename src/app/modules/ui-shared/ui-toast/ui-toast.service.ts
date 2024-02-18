import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UiTranslateLoaderService } from '../ui-util/service/ui-translate-loader';

@Injectable({
    providedIn: 'root',
})
export class UiToastMessageService {
    modelName: '';

    constructor(private messageService: MessageService, protected translateService: UiTranslateLoaderService) {
        this.messageService = messageService;
        this.translateService = translateService;
    }

    showSuccess(message) {
        this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('success'),
            detail: message,
        });
    }

    showInfo(message) {
        this.messageService.add({ severity: 'info', summary: this.translateService.instant('info'), detail: message });
    }

    showWarn(message) {
        this.messageService.add({ severity: 'warn', summary: this.translateService.instant('warn'), detail: message });
    }

    showError(message, life?: number) {
        this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('errorMessage'),
            detail: message,
            life: life,
        });
    }

    showErrorAll(messageAll, life?: number) {
        this.messageService.addAll(
            messageAll.map((item) => {
                return {
                    severity: 'error',
                    summary: this.translateService.instant('errorMessage'),
                    detail: item,
                    life: life,
                };
            }),
        );
    }

    showSaveSuccess(modelName) {
        this.modelName = modelName;
        this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('success'),
            detail: this.translateService.instant('saveSuccessDetail', {
                modelName: modelName,
            }),
        });
    }

    showEditSuccess(modelName) {
        this.modelName = modelName;
        this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('success'),
            detail: this.translateService.instant('editSuccessDetail', {
                modelName: modelName,
            }),
        });
    }

    showDeleteSuccess(modelName) {
        this.modelName = modelName;
        this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('success'),
            detail: this.translateService.instant('deleteSuccessDetail', {
                modelName: modelName,
            }),
        });
    }

    clear() {
        this.messageService.clear();
    }
}
