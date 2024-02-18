import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatTypes } from '../model/date-format-types';
import { UiDateFormatLoaderService } from '../service/ui-date-format-loader.service';

// ürün genelinde kullanılan date formatını döner
@Pipe({ name: 'dateFormat' })
export class UiDateFormatPipe implements PipeTransform {
    constructor(private dateFormatService: UiDateFormatLoaderService) {}

    transform(format: DateFormatTypes = DateFormatTypes.DATE): any {
        let f;
        if (format === DateFormatTypes.DATE) {
            f = this.dateFormatService.get(DateFormatTypes.DATE);
        }
        else if (format === DateFormatTypes.DATE_TIME) {
            f = this.dateFormatService.get(DateFormatTypes.DATE_TIME);
        } else if (format === DateFormatTypes.TIME) {
            f = this.dateFormatService.get(DateFormatTypes.TIME);
        }
        return f;
    }
}
