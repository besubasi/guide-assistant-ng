import { Injectable } from '@angular/core';
import { HvlBaseModel } from '@hvlng/framework-bff/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiMultiSharedService {
    private selectedBases: Map<String, HvlBaseModel> = new Map<String, HvlBaseModel>();
    private dataStringSource = new BehaviorSubject<Map<String, HvlBaseModel>>(this.selectedBases);
    dataString$ = this.dataStringSource.asObservable();

    constructor() {}

    public put(key: string, value: HvlBaseModel) {
        this.selectedBases.set(key, value);
        this.dataStringSource.next(this.selectedBases);
    }

    public remove(key: string) {
        this.selectedBases.delete(key);
        this.dataStringSource.next(this.selectedBases);
    }
    public get(key: string): HvlBaseModel {
        return this.get(key);
    }

    public unsubscribe() {
        this.dataStringSource.unsubscribe();
    }

    public complete() {
        this.dataStringSource.complete();
    }
}
