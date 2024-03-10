import {JsonObject, JsonProperty} from "json2typescript";
import {DistrictSaveModel} from "./district-save-model";

@JsonObject('DistrictModel')
export class DistrictModel extends DistrictSaveModel {

    @JsonProperty('countryCode', String, true)
    countryCode: string = null;

    @JsonProperty('countryName', String, true)
    countryName: string = null;

    @JsonProperty('cityCode', String, true)
    cityCode: string = null;

    @JsonProperty('cityName', String, true)
    cityName: string = null;

}
