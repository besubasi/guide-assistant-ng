import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../../../../common/model/base-model";

@JsonObject('TourActivityRelSaveModel')
export class TourActivityRelSaveModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('dayNumber', Number, true)
    dayNumber: number = null;

    @JsonProperty('lineNumber', Number, true)
    lineNumber: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
