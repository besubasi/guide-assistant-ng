import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UiAmountViewComponent } from './ui-amount-view.component';

@NgModule({
    declarations: [UiAmountViewComponent],
    imports: [CommonModule, TranslateModule],
    exports: [UiAmountViewComponent],
})
export class UiAmountViewModule {}
