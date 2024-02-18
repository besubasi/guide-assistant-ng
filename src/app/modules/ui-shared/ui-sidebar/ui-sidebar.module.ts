import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { UiSideBarComponent } from './ui-sidebar.component';

@NgModule({
    declarations: [UiSideBarComponent],
    imports: [CommonModule, SidebarModule],
    exports: [UiSideBarComponent],
})
export class UiSideBarModule {}
