import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiFormFooterButtonsComponent } from './ui-form-footer-buttons.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [UiFormFooterButtonsComponent],
    imports: [CommonModule, ButtonModule, TranslateModule, ToolbarModule],
    exports: [UiFormFooterButtonsComponent, ButtonModule],
})
export class UiFormFooterButtonsModule {}
