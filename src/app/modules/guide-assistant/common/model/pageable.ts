import {JsonProperty} from 'json2typescript';
import {Sort} from "./sort";

export class Pageable {

    @JsonProperty('pageNumber', Number, true)
    pageNumber: number = 0;

    @JsonProperty('pageSize', Number, true)
    pageSize: number = 20;

    @JsonProperty('sort', Sort, true)
    sort: Sort = new Sort();

}
