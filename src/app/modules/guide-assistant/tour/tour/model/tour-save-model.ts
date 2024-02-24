import {BaseModel} from "../../../common/model/base-model";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('TourSaveModel')
export class TourSaveModel extends BaseModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('tourTypeId', Number, true)
    tourTypeId: number = null;

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('day', Number, true)
    day: number = null;

    @JsonProperty('premierContentUrl', String, true)
    premierContentUrl: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = false;

}
