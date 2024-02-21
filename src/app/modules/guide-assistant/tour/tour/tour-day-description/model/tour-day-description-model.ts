import {JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../common/model/base-model";

export class TourDayDescriptionModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('dayNumber', Number, true)
    dayNumber: number = null;

    @JsonProperty('description', String, true)
    description: string = null;

}
