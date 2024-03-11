import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../common/model/base-model";

@JsonObject('DistrictSaveModel')
export class DistrictSaveModel extends BaseModel {

    @JsonProperty('countryId', Number, true)
    countryId: number = null;

    @JsonProperty('cityId', Number, true)
    cityId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
