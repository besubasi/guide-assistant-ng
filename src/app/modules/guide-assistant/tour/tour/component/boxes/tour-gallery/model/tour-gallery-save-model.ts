import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('TourGallerySaveModel')
export class TourGallerySaveModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

    @JsonProperty('lineNumber', Number, true)
    lineNumber: number = null;

    @JsonProperty('content', String, true)
    content: string = null;

    @JsonProperty('file', File, true)
    file: File = null;

    @JsonProperty('description', String, true)
    description: string = null;

}
