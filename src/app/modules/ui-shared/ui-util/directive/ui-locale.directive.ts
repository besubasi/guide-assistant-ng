import { Pipe, PipeTransform } from '@angular/core';
import { UiLocaleLoaderService } from '../service/ui-locale-loader.service';

// ürün genelinde kullanılan locale bilgisini döner
@Pipe({ name: 'locale' })
export class UiLocalePipe implements PipeTransform {
    constructor(private uiLocaleLoaderService: UiLocaleLoaderService) {}

    transform(): any {
        return this.uiLocaleLoaderService.get();
    }
}
