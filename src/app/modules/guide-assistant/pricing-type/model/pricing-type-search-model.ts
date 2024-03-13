import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../common/model/base-search-model";

@JsonObject('PricingTypeSearchModel')
export class PricingTypeSearchModel extends BaseSearchModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
