import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { UiAmountViewModule } from '../ui-amount-view/ui-amount-view.module';
import { UiStickyAmountViewComponent } from './ui-sticky-amount-view.component';

@NgModule({
    declarations: [UiStickyAmountViewComponent],
    imports: [CommonModule, TranslateModule, UiAmountViewModule],
    exports: [UiStickyAmountViewComponent],
})
export class UiStickyAmountViewModule {}
