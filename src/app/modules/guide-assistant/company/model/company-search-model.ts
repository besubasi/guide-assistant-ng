import {JsonObject, JsonProperty} from 'json2typescript';
import {BaseSearchModel} from "../../common/model/base-search-model";

@JsonObject('CompanySearchModel')
export class CompanySearchModel extends BaseSearchModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('countryId', Number, true)
    countryId: number = null;

    @JsonProperty('cityId', Number, true)
    cityId: number = null;

    @JsonProperty('districtId', Number, true)
    districtId: number = null;

    @JsonProperty('address', String, true)
    address: string = null;

    @JsonProperty('websiteUrl', String, true)
    websiteUrl: string = null;

    @JsonProperty('imageUrl', String, true)
    imageUrl: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
