import {NgModule} from '@angular/core';
import {UiUtilModule} from './ui-util/ui-util.module';
import {UiCardItemModule} from './ui-card-item/ui-card-item.module';
import {UiPageTitleModule} from './ui-page-title/ui-page-title.module';
import {UiPageHeaderModule} from './ui-page-header/ui-page-header.module';
import {UiOverlayBlockerModule} from './ui-overlay-blocker/ui-overlay-blocker.module';
import {UiEnumTransformerPipe} from './ui-util/utils/ui-enum-transformer.pipe';
import {UiStickyButtonbarModule} from './ui-sticky-buttonbar/ui-sticky-buttonbar.module';
import {UiEmptyStateModule} from './ui-empty-state/ui-empty-state.module';
import {UiFormFooterButtonsModule} from './ui-form-footer-buttons/ui-form-footer-buttons.module';
import {UiStrongPipe} from './ui-util/utils/ui-strong.pipe';
import {
    UiAdvanceSearchFooterButtonsModule
} from './ui-advance-search-footer-buttons/ui-advance-search-footer-buttons.module';
import {UiSideBarModule} from './ui-sidebar/ui-sidebar.module';
import {UiPreloaderModule} from './ui-preloader/ui-preloader.module';
import {UiCopyButtonModule} from './ui-copy-button/ui-copy-button.module';
import {UiTableColFilterModule} from './ui-table-col-filter/ui-table-col-filter.module';
import {UiAmountViewModule} from './ui-amount-view/ui-amount-view.module';
import {UiCheckIconModule} from './ui-check-icon/ui-check-icon.module';

import {UiPreviewModule} from './ui-preview/ui-preview.module';
import {UiCheckCloseIconsModule} from './ui-check-close-icons/ui-check-close-icons.module';
import {UiActiveInactiveTagsModule} from './ui-active-inactive-tags/ui-active-inactive-tags.module';
import {UiFormatFileSizePipe} from './ui-util/utils/ui-format-file-size.pipe';
import {UiStickyAmountViewModule} from './ui-sticky-amount-view/ui-sticky-amount-view.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [UiEnumTransformerPipe, UiStrongPipe, UiFormatFileSizePipe],
    imports: [
        UiPageTitleModule,
        UiPageHeaderModule,
        UiCardItemModule,
        UiUtilModule,
        UiOverlayBlockerModule,
        UiStickyButtonbarModule,
        UiEmptyStateModule,
        UiFormFooterButtonsModule,
        UiAdvanceSearchFooterButtonsModule,
        UiSideBarModule,
        UiPreloaderModule,
        UiCopyButtonModule,
        UiTableColFilterModule,
        UiAmountViewModule,
        UiCheckIconModule,
        UiPreviewModule,
        UiCheckCloseIconsModule,
        UiActiveInactiveTagsModule,
        UiStickyAmountViewModule,
        TranslateModule,
    ],
    exports: [
        UiPageTitleModule,
        UiPageHeaderModule,
        UiCardItemModule,
        UiUtilModule,
        UiOverlayBlockerModule,
        UiEnumTransformerPipe,
        UiStickyButtonbarModule,
        UiEmptyStateModule,
        UiFormFooterButtonsModule,
        UiStrongPipe,
        UiAdvanceSearchFooterButtonsModule,
        UiSideBarModule,
        UiPreloaderModule,
        UiCopyButtonModule,
        UiTableColFilterModule,
        UiAmountViewModule,
        UiCheckIconModule,
        UiPreviewModule,
        UiCheckCloseIconsModule,
        UiActiveInactiveTagsModule,
        UiFormatFileSizePipe,
        UiStickyAmountViewModule,
        TranslateModule,
    ],
})
export class UiSharedModule {
}
