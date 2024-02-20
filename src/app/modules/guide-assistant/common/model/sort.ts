import {JsonProperty} from 'json2typescript';

import {EnumSortDirection} from "../enum/enum-sort-direction";

export class Sort {

    @JsonProperty('property', String, true)
    property: string = "id";

    @JsonProperty('direction', String, true)
    direction: EnumSortDirection = EnumSortDirection.DESC;

}
