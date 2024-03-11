import {JsonObject, JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../../common/model/base-model";

@JsonObject('ActivityGalleryModel')
export class ActivityGalleryModel extends BaseModel {

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('lineNumber', Number, true)
    lineNumber: number = null;

    @JsonProperty('contentUrl', String, true)
    contentUrl: string = null;

    @JsonProperty('description', String, true)
    description: string = null;

}
