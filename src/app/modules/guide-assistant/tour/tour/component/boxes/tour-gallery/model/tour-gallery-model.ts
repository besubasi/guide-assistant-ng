import {JsonObject, JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../../../common/model/base-model";

@JsonObject('TourGalleryModel')
export class TourGalleryModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('lineNumber', Number, true)
    lineNumber: number = null;

    @JsonProperty('contentUrl', String, true)
    contentUrl: string = null;

    @JsonProperty('description', String, true)
    description: string = null;

}
