import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-tour-category-list',
    standalone: true,
    imports: [],
    templateUrl: './tour-category-list.component.html',
    styleUrl: './tour-category-list.component.scss'
})
export class TourCategoryListComponent {

    @Output() onRowSelectEvent = new EventEmitter();
    @Output() onRowUnselectEvent = new EventEmitter();


}
