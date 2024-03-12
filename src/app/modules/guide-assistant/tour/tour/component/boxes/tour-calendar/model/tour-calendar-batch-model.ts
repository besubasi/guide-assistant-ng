import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('TourCalendarBatchModel')
export class TourCalendarBatchModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('startDateList', [String], true)
    startDateList: string[] = [];

}
