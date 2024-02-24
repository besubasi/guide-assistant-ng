import {JsonObject, JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../../../common/model/base-model";

@JsonObject('TourDescriptionModel')
export class TourDescriptionModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('descriptionFirst', String, true)
    descriptionFirst: string = null;

    @JsonProperty('descriptionSecond', String, true)
    descriptionSecond: string = null;

}
