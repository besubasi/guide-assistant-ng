import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { UiEmptyStateComponent } from './ui-empty-state.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [UiEmptyStateComponent],
    imports: [CommonModule, CardModule, TranslateModule, ButtonModule],
    exports: [UiEmptyStateComponent],
})
export class UiEmptyStateModule {}
