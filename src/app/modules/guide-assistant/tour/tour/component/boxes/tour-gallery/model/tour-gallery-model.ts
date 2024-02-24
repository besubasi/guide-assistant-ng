import {JsonObject, JsonProperty} from "json2typescript";

import {BaseModel} from "../../../../../../common/model/base-model";

@JsonObject('TourGalleryModel')
export class TourGalleryModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('imageUrl', String, true)
    imageUrl: string = null;

    @JsonProperty('thumbnailImageUrl', String, true)
    thumbnailImageUrl: string = null;

}
