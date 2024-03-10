import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../common/model/base-search-model";

@JsonObject('DistrictSearchModel')
export class DistrictSearchModel extends BaseSearchModel {

    @JsonProperty('cityId', Number, true)
    cityId: number = null;

    @JsonProperty('countryId', Number, true)
    countryId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
