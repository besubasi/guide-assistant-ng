import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../../../../common/model/base-search-model";

@JsonObject('TourDayDescriptionSearchModel')
export class TourDayDescriptionSearchModel extends BaseSearchModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

}
