import { UntypedFormGroup } from '@angular/forms';
import { HvlPageable, HvlSort } from '@hvlng/framework-bff/core';
import { LazyLoadEvent } from 'primeng/api';

/**
 *
 * @param event
 * @param queryForm
 * @returns
 * @description Bu metod altyapıdaki (@hvlng) preparePageable metodu, Abstract sınıf extend edilmeden kullanılamadığı için eklendi.
 */
export function uiKovanPreparePageable(event: LazyLoadEvent, queryForm: UntypedFormGroup): UntypedFormGroup {
    queryForm.value.pageable = new HvlPageable();
    queryForm.value.pageable.sort = new HvlSort();
    if (event.first > 0) {
        queryForm.value.pageable.pageNumber = event.first / event.rows;
    } else {
        queryForm.value.pageable.pageNumber = event.first;
    }
    queryForm.value.pageable.pageSize = event.rows;
    if (event.sortField) {
        queryForm.value.pageable.sort.properties = new Array(event.sortField);
    } else if (event.multiSortMeta) {
        queryForm.value.pageable.sort.properties = event.multiSortMeta.map((i) => i.field);
    } else {
        queryForm.value.pageable.sort.direction = 'DESC';
        queryForm.value.pageable.sort.properties = ['id'];
    }
    let filters = Object.getOwnPropertyNames(event.filters);
    for (let filter of filters) {
        queryForm.value[filter] = event.filters[filter].value;
    }
    return queryForm;
}
