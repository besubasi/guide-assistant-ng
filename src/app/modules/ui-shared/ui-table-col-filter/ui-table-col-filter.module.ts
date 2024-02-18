import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTableColFilterComponent } from './ui-table-col-filter.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [UiTableColFilterComponent],
    imports: [
        CommonModule,
        ToolbarModule,
        ButtonModule,
        TranslateModule,
        MultiSelectModule,
        TranslateModule,
        FormsModule,
    ],
    exports: [UiTableColFilterComponent],
})
export class UiTableColFilterModule {}
