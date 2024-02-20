import {JsonProperty} from 'json2typescript';
import {Pageable} from "./pageable";

export class BaseSearchModel {

    @JsonProperty('pageable', Pageable, true)
    pageable: Pageable = new Pageable();

}
