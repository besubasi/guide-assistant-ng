import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiAnyMultiSharedService {
    private selectedBases: Map<String, any> = new Map<String, any>();
    private dataStringSource = new BehaviorSubject<Map<String, any>>(this.selectedBases);
    dataString$ = this.dataStringSource.asObservable();

    public put(key: string, value: any) {
        this.selectedBases.set(key, value);
        this.dataStringSource.next(this.selectedBases);
    }

    public remove(key: string) {
        this.selectedBases.delete(key);
        this.dataStringSource.next(this.selectedBases);
    }

    public get(key: string): any {
        return this.get(key);
    }

    public unsubscribe() {
        this.dataStringSource.unsubscribe();
    }

    public complete() {
        this.dataStringSource.complete();
    }
}
