import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import {DateFormatTypes} from '../model/date-format-types';
import {UiDateFormatLoaderService} from '../service/ui-date-format-loader.service';

// çevirisi yapılacak tarih değerini alır ve ürün genelinde kullanılan formata uygun tarih ve/veya saate dönüştürür
@Pipe({name: 'dateConvert'})
export class UiDateFormatConverterPipe extends DatePipe implements PipeTransform {
    constructor(private dateFormatService: UiDateFormatLoaderService) {
        super('en-US');
    }

    override transform(value: any, format: DateFormatTypes = DateFormatTypes.DATE): any {
        let f = this.dateFormatService.get(DateFormatTypes.DATE);
        if (f === 'dd.mm.yy') {
            f = 'dd.MM.yyyy';
        }
        if (format === DateFormatTypes.DATE_TIME) {
            f = this.dateFormatService.get(DateFormatTypes.DATE_TIME);
            if (f === 'dd.mm.yy HH:mm') {
                f = 'dd.MM.yyyy HH:mm';
            }
        } else if (format === DateFormatTypes.TIME) {
            f = this.dateFormatService.get(DateFormatTypes.TIME);
        } else if (format === DateFormatTypes.DATE_TIME_SECOND) {
            f = 'dd.MM.yyyy HH:mm:ss';
        }
        return super.transform(value, f);
    }
}
