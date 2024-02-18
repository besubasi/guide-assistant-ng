import { Directive, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Directive({
    selector: '[uiMultipleEntityPickerView]',
})
export class UiMultipleEntityPickerViewDirective implements OnInit {
    private _listData: any[];
    @Input() set listData(value: any[]) {
        if (value === this._listData) return;
        this._listData = value;
        this.setModelData();
    }

    get listData(): any[] {
        return this._listData;
    }

    @Input() modelName: string;
    @Input() propName: string;
    @Output() ngModelChange = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        if(!this.propName) this.propName = "definition";
    }

    private setModelData() {
        if (this.listData && this.listData.length > 0) {
            if(this.listData.length === 1) {
                this.ngModelChange.emit(this.listData);
            } else if(this.listData.length > 1) {
                const tempValue = this.listData.length + ' ' + this.modelName;
                const tempArr = [{ [this.propName]: tempValue }];
                this.ngModelChange.emit(tempArr);
            }
        }
    }
}
