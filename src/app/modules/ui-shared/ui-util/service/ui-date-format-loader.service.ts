import {Injectable} from '@angular/core';
import {DateFormatTypes} from '../model/date-format-types';

@Injectable({
    providedIn: 'root',
})
export class UiDateFormatLoaderService {
    constructor() {
    }

    set(dateFormatType: DateFormatTypes, format: string) {
        localStorage.setItem(dateFormatType, format);
    }

    get(dateFormatType: DateFormatTypes) {
        const formatInStorage = localStorage.getItem(dateFormatType);

        return localStorage.getItem(dateFormatType);
    }
}
