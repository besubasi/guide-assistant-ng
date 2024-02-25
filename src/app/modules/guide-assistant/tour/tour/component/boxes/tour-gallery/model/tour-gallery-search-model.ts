import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../../../../../common/model/base-search-model";

@JsonObject('TourGallerySearchModel')
export class TourGallerySearchModel extends BaseSearchModel {

    @JsonProperty('tourId', Number, true)
    tourId: number = null;

}
