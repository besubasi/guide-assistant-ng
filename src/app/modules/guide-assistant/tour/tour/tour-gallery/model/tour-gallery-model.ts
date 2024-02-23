import {BaseModel} from "../../../../common/model/base-model";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('TourGalleryModel')
export class TourGalleryModel extends BaseModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('imageUrl', String, true)
    imageUrl: string = null;

    @JsonProperty('thumbnailImageUrl', String, true)
    thumbnailImageUrl: string = null;

}
