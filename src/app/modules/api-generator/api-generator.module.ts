import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CalendarModule} from "primeng/calendar";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {StyleClassModule} from "primeng/styleclass";
import {ToastModule} from 'primeng/toast';
import {MessageModule} from "primeng/message";

import {ApiGeneratorPageComponent} from "./component/api-generator-page.component";
import {ApiGeneratorRoutingModule} from "./api-generator-routing.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ApiGeneratorRoutingModule,
        ApiGeneratorPageComponent,
        FormsModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        StyleClassModule,
        ToastModule,
        MessageModule
    ]
})
export class ApiGeneratorModule {
}
