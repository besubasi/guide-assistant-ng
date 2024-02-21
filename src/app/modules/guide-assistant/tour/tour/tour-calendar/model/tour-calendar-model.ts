import {JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../common/model/base-model";

export class TourCalendarModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('date', Date, true)
    date: Date = null;

}
