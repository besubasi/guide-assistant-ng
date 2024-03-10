import {JsonObject, JsonProperty} from "json2typescript";
import {CitySaveModel} from "./city-save-model";

@JsonObject('CityModel')
export class CityModel extends CitySaveModel {

    @JsonProperty('countryCode', String, true)
    countryCode: string = null;

    @JsonProperty('countryName', String, true)
    countryName: string = null;
}
