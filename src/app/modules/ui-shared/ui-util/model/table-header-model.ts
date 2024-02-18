import { Pipe } from '@angular/core';
import { FilterMatchMode } from 'primeng/api';

export declare class UiTableHeaderModel {
    field: string;
    header: string;
    matchMode?: FilterMatchMode;
    class?: string;
    pipe?: Pipe;
    type?: string;
    enumKey?: string;
    childField?: string;
    width?: string;
    sortField?: string;
}
