import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiTemplateDirective} from './directive/ui-template-directive';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';
import {UiIdSetterDirective} from './directive/ui-id-setter.directive';
import {UiDateFormatPipe} from './directive/ui-date-format.pipe';
import {UiDateFormatConverterPipe} from './directive/ui-date-format-converter.pipe';
import {UiLocalePipe} from './directive/ui-locale.directive';
import {ControlRequiredPipe} from './utils/control-required-field.pipe';

import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {UiStickyButtonbarModule} from '../ui-sticky-buttonbar/ui-sticky-buttonbar.module';
import {TagModule} from 'primeng/tag';

import {TableModule} from 'primeng/table';
import {UiMultipleEntityPickerViewDirective} from './directive/ui-multiple-entity-picker-view.directive';

import {UiDraftFormDirective} from './directive/ui-draft-form.directive';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        UiTemplateDirective,
        UiIdSetterDirective,
        UiDateFormatPipe,
        UiDateFormatConverterPipe,
        UiLocalePipe,
        ControlRequiredPipe,
        UiMultipleEntityPickerViewDirective,
        UiDraftFormDirective,
    ],
    imports: [
        CommonModule,
        TooltipModule,
        RippleModule,
        TranslateModule,
        ButtonModule,
        UiStickyButtonbarModule,
        TagModule,
        TableModule,
        ReactiveFormsModule,
    ],
    exports: [
        TooltipModule,
        RippleModule,
        UiTemplateDirective,
        UiIdSetterDirective,
        UiDateFormatPipe,
        UiDateFormatConverterPipe,
        UiLocalePipe,
        ControlRequiredPipe,
        UiMultipleEntityPickerViewDirective,
        UiDraftFormDirective,
    ],
})
/**
 * Proje genelinde kullanılacak directive leri içeren ui module.
 * Util servisler ve işlem fonksiyonları public-api üzerinden ayrıca export edilmektedir.
 * Çünkü angular'da bir modül üzerinden servis export edilmemektedir. Lütfen bakınız: public-api.ts
 */
export class UiUtilModule {
}
