import {BaseSearchModel} from "../../../common/model/base-search-model";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('TourSearchModel')
export class TourSearchModel extends BaseSearchModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('tourTypeId', Number, true)
    tourTypeId: number = null;

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('day', Number, true)
    day: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = false;

}
