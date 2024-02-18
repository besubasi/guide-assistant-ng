export class PageConfig {
    hideCRUD: boolean = false;
    hideListHeader: boolean = false;
    hideListColumns: boolean[] = [];
    hideSearchFields: boolean[] = [];
    hideListSearch: boolean = false;
    readOnlyFieldNames: string[] = [];
    listSelectionMode: 'single' | 'multiple' = 'single';
    isEntityPicker: boolean = false;

    searchField: { key: ''; value: '' };
    defaultSearchValues: Map<string, string> = new Map<string, string>();

    hideColumn(order: number): boolean {
        if (this.hideListColumns.length == 0) {
            return false;
        }
        if (this.hideListColumns.length < order) {
            return false;
        } else {
            return this.hideListColumns[order];
        }
    }

    hideSearchField(order: number): boolean {
        if (this.hideSearchFields.length == 0) {
            return false;
        }
        if (this.hideSearchFields.length < order) {
            return false;
        } else {
            return this.hideSearchFields[order];
        }
    }
}
