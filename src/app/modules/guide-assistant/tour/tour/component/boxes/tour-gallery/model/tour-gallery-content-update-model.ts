import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('TourGalleryContentUpdateModel')
export class TourGalleryContentUpdateModel {

    @JsonProperty('id', Number, true)
    id: number = null;

    @JsonProperty('content', String, true)
    content: string = null;

}
