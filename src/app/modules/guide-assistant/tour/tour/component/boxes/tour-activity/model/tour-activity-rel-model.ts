import {JsonObject, JsonProperty} from "json2typescript";
import {TourActivityRelSaveModel} from "./tour-activity-rel-save-model";

@JsonObject('TourActivityRelModel')
export class TourActivityRelModel extends TourActivityRelSaveModel {

    @JsonProperty('tourCode', String, true)
    tourCode: string = null;

    @JsonProperty('tourName', String, true)
    tourName: string = null;

    @JsonProperty('activityCode', String, true)
    activityCode: string = null;

    @JsonProperty('activityName', String, true)
    activityName: string = null;

}
