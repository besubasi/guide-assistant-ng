import {Injectable} from '@angular/core';
import {HvlBaseModel} from '@hvlng/framework-bff/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiSharedService {
    private selectedBase: HvlBaseModel = null;
    private dataStringSource = new BehaviorSubject<HvlBaseModel>(this.selectedBase);
    dataString$ = this.dataStringSource.asObservable();

    constructor() {
    }

    public saveData(value: HvlBaseModel) {
        if (value == null) {
            this.selectedBase = null;
            this.dataStringSource.next(null);
        } else {
            this.selectedBase = value;
            this.dataStringSource.next(this.selectedBase);
        }
    }

    public unsubscribe() {
        this.dataStringSource.unsubscribe();
    }

    public complete() {
        this.dataStringSource.complete();
    }
}
