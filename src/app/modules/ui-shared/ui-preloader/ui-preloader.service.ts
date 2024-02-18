import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PreloaderService {
    private visibility = new BehaviorSubject<boolean>(false);
    getHandler: Observable<boolean> = this.visibility.asObservable();
    loading: boolean = false;

    /**
     *
     * @description preloader durumunu döner
     */
    public isLoading() {
        return this.visibility.value;
    }

    /**
     *
     * @description preloader gösterir
     */
    show() {
        this.visibility.next(true);
    }

    /**
     *
     * @description preloader gösterimini gizler
     */
    hide() {
        this.loading = false;
        return this.visibility.next(false);
    }
}
