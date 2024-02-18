import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { UiCardItemComponent } from './ui-card-item.component';

@NgModule({
    declarations: [UiCardItemComponent],
    imports: [CommonModule, CardModule],
    exports: [UiCardItemComponent],
})
export class UiCardItemModule {}
