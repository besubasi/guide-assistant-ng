import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../common/model/base-search-model";

@JsonObject('TourCategorySearchModel')
export class TourCategorySearchModel extends BaseSearchModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
