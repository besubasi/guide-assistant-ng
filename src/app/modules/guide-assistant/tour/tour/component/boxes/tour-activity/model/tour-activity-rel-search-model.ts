import {JsonObject, JsonProperty} from "json2typescript";
import {BaseSearchModel} from "../../../../../../common/model/base-search-model";


@JsonObject('TourActivityRelSearchModel')
export class TourActivityRelSearchModel extends BaseSearchModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('dayNumber', Number, true)
    dayNumber: number = null;

    @JsonProperty('lineNumber', Number, true)
    lineNumber: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
