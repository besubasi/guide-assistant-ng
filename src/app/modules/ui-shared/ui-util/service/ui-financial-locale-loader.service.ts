import { Injectable } from '@angular/core';
import { HvlConfigurationService } from '@hvlng/framework-bff/core';
@Injectable({
    providedIn: 'root',
})
export class UiFinancialLocaleLoaderService {
    constructor(private configService: HvlConfigurationService) {}

    set(locale: string) {
        localStorage.setItem('localeFinancial', locale);
    }

    get() {
        const localeInStorage = localStorage.getItem('localeFinancial');

        if (!localeInStorage) {
            return this.configService.config.application.localeFinancial;
        }
        return localeInStorage;
    }
}
