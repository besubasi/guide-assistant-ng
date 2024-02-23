import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../../../common/model/base-search-model";

@JsonObject('TourDescriptionSearchModel')
export class TourDescriptionSearchModel extends BaseSearchModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

}
