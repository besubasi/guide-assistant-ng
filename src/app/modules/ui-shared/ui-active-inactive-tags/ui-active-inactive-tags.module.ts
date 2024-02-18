import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TagModule} from 'primeng/tag';

import {UiActiveInactiveTagsComponent} from './ui-active-inactive-tags.component';

@NgModule({
    declarations: [UiActiveInactiveTagsComponent],
    imports: [CommonModule, FormsModule, TagModule],
    exports: [UiActiveInactiveTagsComponent],
})
export class UiActiveInactiveTagsModule {
}
