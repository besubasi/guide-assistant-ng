import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('TourCategoryModel')
export class TourCategoryModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

}
