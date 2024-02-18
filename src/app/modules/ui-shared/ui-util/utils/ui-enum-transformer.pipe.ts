import { Pipe, PipeTransform } from '@angular/core';
import { UiItem } from '../model/ui-item';

@Pipe({ name: 'transformer' })
export class UiEnumTransformerPipe implements PipeTransform {
    transform(key: any, values: UiItem[]): string {
        return values.find((f) => f.value === key)?.label;
    }
}
