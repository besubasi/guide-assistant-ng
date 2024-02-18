import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiTranslateLoaderService extends TranslateService {
    allLoadedFileList: Array<string> = [];

    // constructor(private translateService: TranslateService) {
    //     this.translateService = translateService;
    // }

    /**
     * @deprecated Artık bu metodu çağırmanız gerekmiyor. Kullanım dışıdır.
     * @description Her sayfada translate yüklemek için init metodunu çağırma yöntemi iptal edildi.
     * Tüm kodları refactor etmek yerine işlevsiz hale getirdik.
     */
    init(resourceList?: string | Array<string>, checkInitializer?: boolean): Observable<any> {
        /** TODO: BU KISIM ALTYAPI TARAFINDA OLMASI GEREKTİĞİ İÇİN KONUŞULACAK */
        //let commonBundleString = this.configurationService?.config?.application?.common?.bundle;
        //let commonBundleArray = commonBundleString.split(',');
        //localStorage.removeItem('languageFiles');
        //localStorage.setItem('languageFiles', JSON.stringify(commonBundleArray));

        /*if (checkInitializer) {
            let resourceListString;
            if (Array.isArray(resourceList)) {
                resourceListString = resourceList.join(',');
            } else {
                resourceListString = resourceList;
            }

            return this.componentLanguageService.init(resourceListString);
        } else {*/
        return new Observable((obs) => {
            obs.next(true);
        });
        /* }*/
    }

    /**
     * This method translates given key
     * @param key
     * @param interpolateParams
     * @returns
     */
    override instant(key: string | Array<string>, interpolateParams?: Object): string | any {
        return super.instant(key, interpolateParams);
    }

    /**
     * This method subscribes to given key
     * @param key
     * @param interpolateParams
     * @returns
     */
    override get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
        return super.get(key, interpolateParams);
    }
}
