import {JsonObject, JsonProperty} from 'json2typescript';
import {CompanySaveModel} from "./company-save-model";

@JsonObject('CompanyModel')
export class CompanyModel extends CompanySaveModel {

    @JsonProperty('countryName', String, true)
    countryName: string = null;

    @JsonProperty('cityName', String, true)
    cityName: string = null;

    @JsonProperty('districtName', String, true)
    districtName: string = null;

}
