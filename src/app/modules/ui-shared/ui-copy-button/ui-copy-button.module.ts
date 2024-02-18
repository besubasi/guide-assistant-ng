import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { UiCopyButtonComponent } from './ui-copy-button.component';

@NgModule({
    declarations: [UiCopyButtonComponent],
    imports: [CommonModule, ButtonModule, TranslateModule],
    exports: [UiCopyButtonComponent],
})
export class UiCopyButtonModule {}
