import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'strong' })
export class UiStrongPipe implements PipeTransform {
    transform(value: string, searchText: string): string {
        if (value) {
            const index = value.toLocaleUpperCase().indexOf(searchText.toLocaleUpperCase());

            if (index > -1)
                return (
                    value.substr(0, index) +
                    '<b>' +
                    value.substr(index, searchText.length) +
                    '</b>' +
                    value.substr(index + searchText.length)
                );
        }

        return '';
    }
}
