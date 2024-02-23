import {JsonObject, JsonProperty} from 'json2typescript';
import {Pageable} from "./pageable";

@JsonObject('BaseSearchModel')
export class BaseSearchModel {

    @JsonProperty('id', Number, true)
    id: number = null;

    @JsonProperty('pageable', Pageable, true)
    pageable: Pageable = new Pageable();

}
