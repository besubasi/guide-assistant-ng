import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAdvanceSearchFooterButtonsComponent } from './ui-advance-search-footer-buttons.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [UiAdvanceSearchFooterButtonsComponent],
    imports: [CommonModule, ButtonModule, TranslateModule, ToolbarModule],
    exports: [UiAdvanceSearchFooterButtonsComponent, ButtonModule],
})
export class UiAdvanceSearchFooterButtonsModule {}
