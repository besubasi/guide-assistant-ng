import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPreviewContainerComponent } from './ui-preview-container/ui-preview-container.component';
import { CardModule } from 'primeng/card';
import { UiPageTitleModule } from '../ui-page-title/ui-page-title.module';

@NgModule({
    declarations: [UiPreviewContainerComponent],
    imports: [CommonModule, CardModule, UiPageTitleModule],
    exports: [UiPreviewContainerComponent],
})
export class UiPreviewModule {}
