import { Injectable } from '@angular/core';
import { DropdownOption } from '../model/dropdown-option';
import { DropdownOptionTypes } from '../model/dropdown-option-types';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class UiEnumService {
    constructor(private translateService: TranslateService) {}

    /**
     * createDropdownList metodu, enum ve varsa enumun localizasyon değerini alır ve primeng dropdown'a seçenek listesi olarak bir array hazırlar.
     */
    createDropdownList(enumType: any, enumI18n?: { [key: string]: any }, alphabeticOrder?: boolean): DropdownOption[] {
        let dropdownList: DropdownOption[] = [];

        if (enumI18n) {
            for (let enumLabel in enumType) {
                let item = new DropdownOption();
                item.value = enumLabel;
                item.label = enumI18n[enumLabel] === 'loading...' ? enumI18n.raw[enumLabel] : enumI18n[enumLabel];
                dropdownList.push(item);
            }
        } else {
            for (let enumLabel in enumType) {
                let item = new DropdownOption();
                item.value = enumLabel;
                item.label = enumLabel;
                dropdownList.push(item);
            }
        }

        if (alphabeticOrder) {
            dropdownList.sort((a, b) => (a.label?.localeCompare(b.label)));
        }
        return dropdownList;
    }

    /**
     * return DropdownOption List with different types
     * @param enumType
     * @param enumI18n
     * @param alphabeticOrder
     */
    createDropdownListWithTypes(enumType: any, enumI18n?: { [key: string]: any }, alphabeticOrder?: boolean): DropdownOptionTypes[] {
        let dropdownList: DropdownOptionTypes[] = [];

        if (enumI18n) {
            for (let enumLabel in enumType) {
                let item = new DropdownOptionTypes();
                item.value = enumType[enumLabel];
                item.label = enumI18n[enumLabel];
                dropdownList.push(item);
            }
        } else {
            for (let enumLabel in enumType) {
                let item = new DropdownOptionTypes();
                item.value = enumType[enumLabel];
                item.label = enumLabel;
                dropdownList.push(item);
            }
        }

        if (alphabeticOrder) {
            dropdownList.sort((a, b) => (a.label?.localeCompare(b.label)));
        }
        return dropdownList;
    }

    async getDropdownList(
        enumType: any,
        resourceKey?: string,
        params?: { sortByValue?: boolean; sortByLabel?: boolean; numericEnumType?: boolean },
    ): Promise<DropdownOption[]> {
        let list: DropdownOption[];
        if (resourceKey) {
            let resourceValues = await this.translateAsync(resourceKey);
            if (params?.numericEnumType) {
                list = Object.keys(enumType)
                    .reduce((arr, key) => {
                        if (!arr.includes(key)) {
                            arr.push(enumType[key].valueOf());
                        }
                        return arr;
                    }, [])
                    .map((k) => {
                        let item = new DropdownOption();
                        item.value = k;
                        item.label = resourceValues[k];
                        return item;
                    });
            } else {
                list = Object.keys(enumType).map((k) => {
                    let item = new DropdownOption();
                    item.value = k;
                    item.label = resourceValues[k];
                    return item;
                });
            }
        } else {
            if (params?.numericEnumType) {
                list = Object.keys(enumType)
                    .reduce((arr, key) => {
                        if (!arr.includes(key)) {
                            arr.push(enumType[key].valueOf());
                        }
                        return arr;
                    }, [])
                    .map((k) => {
                        let item = new DropdownOption();
                        item.value = k;
                        item.label = k;
                        return item;
                    });
            } else {
                list = Object.keys(enumType).map((k) => {
                    let item = new DropdownOption();
                    item.value = k;
                    item.label = k;
                    return item;
                });
            }
        }
        return this.sortBy(list, params);
    }

    private sortBy(list: DropdownOption[], params?: { sortByValue?: boolean; sortByLabel?: boolean }) {
        if (params?.sortByValue) {
            return list.sort((n1, n2) => n1.value?.localeCompare(n2.value));
        } else if (params?.sortByLabel) {
            return list.sort((n1, n2) => n1.label?.localeCompare(n2.label));
        }
        return list;
    }

    private translateAsync(key: string): Promise<string | any> {
        return new Promise<string | any>((resolve) => {
            this.translateService.stream(key).subscribe((value) => {
                if (key !== value) {
                    resolve(value);
                }
            });
        });
    }
}
