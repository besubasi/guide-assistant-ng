import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPageTitleComponent } from './ui-page-title.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
    declarations: [UiPageTitleComponent],
    imports: [CommonModule, MenuModule],
    exports: [UiPageTitleComponent],
})
export class UiPageTitleModule {}
