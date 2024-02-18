import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiCheckCloseIconsComponent } from './ui-check-close-icons.component';

@NgModule({
    declarations: [UiCheckCloseIconsComponent],
    imports: [CommonModule, FormsModule],
    exports: [UiCheckCloseIconsComponent],
})
export class UiCheckCloseIconsModule {}
