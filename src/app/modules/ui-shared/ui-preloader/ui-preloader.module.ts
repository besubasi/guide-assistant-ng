import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPreloaderComponent } from './ui-preloader.component';

@NgModule({
    declarations: [UiPreloaderComponent],
    imports: [CommonModule],
    exports: [UiPreloaderComponent],
})
export class UiPreloaderModule {}
