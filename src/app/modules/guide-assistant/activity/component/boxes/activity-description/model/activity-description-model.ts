import {JsonObject, JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../../common/model/base-model";

@JsonObject('ActivityDescriptionModel')
export class ActivityDescriptionModel extends BaseModel {

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('descriptionFirst', String, true)
    descriptionFirst: string = null;

    @JsonProperty('descriptionSecond', String, true)
    descriptionSecond: string = null;

}
