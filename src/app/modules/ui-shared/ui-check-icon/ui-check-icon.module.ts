import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiCheckIconComponent } from './ui-check-icon.component';

@NgModule({
    declarations: [UiCheckIconComponent],
    imports: [CommonModule, FormsModule],
    exports: [UiCheckIconComponent],
})
export class UiCheckIconModule {}
