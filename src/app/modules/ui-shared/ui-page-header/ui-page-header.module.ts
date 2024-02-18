import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPageHeaderComponent } from './ui-page-header.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
    declarations: [UiPageHeaderComponent],
    imports: [CommonModule, MenuModule],
    exports: [UiPageHeaderComponent],
})
export class UiPageHeaderModule {}
