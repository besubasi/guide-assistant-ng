import { Component, Input, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Component({
    selector: 'ui-table-col-filter',
    templateUrl: './ui-table-col-filter.component.html',
})
/**
 * @Description Bu component Table filter için kullanılmayacaktır. Primeng 13 versiyonunda Table > Toogle özelliği kullanılarak bu ihtiyaç geliştirilecek.
 * Eğer ihtiyaç olursa değerlendirilecek, yedekte bekletiliyor.
 */
export class UiTableColFilterComponent implements OnInit, AfterViewInit {
    @Input() optionLabel: string = 'header';
    @Input() optionValue: string = 'field';
    selectedCols: any[];

    private _cols: any[];
    /** @description tablo kolonları listesi verilmeli */
    @Input() set cols(value: any[]) {
        if (value === this._cols) return;
        this._cols = value;
        this.selectedCols = value;
    }

    get cols(): any[] {
        return this._cols;
    }

    @Output() outputSelectedCols: EventEmitter<any[]> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.selectedCols = this.cols;
    }

    onChange(event) {
        this.selectedCols = event.value;
        this.outputSelectedCols.emit(event.value);
    }
}
