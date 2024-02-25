import {JsonObject, JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../../../common/model/base-model";

@JsonObject('TourCalendarModel')
export class TourCalendarModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('startDate', Date, true)
    startDate: Date = null;

}
