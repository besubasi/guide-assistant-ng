import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, NgIf, NgStyle} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {TourRoutingModule} from "./tour-routing.module";
import {UiSharedModule} from "../../ui-shared/ui-shared.module";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TourRoutingModule,
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
        MessageModule,
        UiSharedModule,
        NgStyle,
        ButtonModule,
        CurrencyPipe,
        MenuModule,
        SharedModule,
        TableModule,
        ChartModule,
        ReactiveFormsModule,
        NgIf,
        ToolbarModule,
        CardModule,
        CheckboxModule,
        RippleModule,
        DividerModule
    ],
    exports: []
})
export class TourModule {
}
