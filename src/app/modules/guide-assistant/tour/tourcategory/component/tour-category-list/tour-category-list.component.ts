import {Component, EventEmitter, Output} from '@angular/core';
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";

@Component({
    selector: 'app-tour-category-list',
    standalone: true,
    imports: [
        CardModule,
        TableModule,
        DropdownModule
    ],
    templateUrl: './tour-category-list.component.html',
    styleUrl: './tour-category-list.component.scss'
})
export class TourCategoryListComponent {

    @Output() onRowSelectEvent = new EventEmitter();
    @Output() onRowUnselectEvent = new EventEmitter();


}
