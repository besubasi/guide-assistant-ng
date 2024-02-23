import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../../common/model/base-search-model";

@JsonObject('TourTypeSearchModel')
export class TourTypeSearchModel extends BaseSearchModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('tourCategoryId', Number, true)
    tourCategoryId: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
