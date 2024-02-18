import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('TourCategoryModel')
export class TourCategoryModel {

    @JsonProperty('id', Number, true)
    id: number = null;

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
