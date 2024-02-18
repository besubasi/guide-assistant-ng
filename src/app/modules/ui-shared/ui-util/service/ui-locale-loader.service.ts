import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UiLocaleLoaderService {
    constructor() {
    }

    set(locale: string) {
        localStorage.setItem('locale', locale);
    }

    get() {
        const localeInStorage = localStorage.getItem('locale');
        return localeInStorage;
    }
}
