import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('CompanyModel')
export class CompanyModel {

    @JsonProperty('id', Number, true)
    id: number = null;

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('countryId', Number, true)
    countryId: number = null;

    @JsonProperty('countryName', String, true)
    countryName: string = null;

    @JsonProperty('cityId', Number, true)
    cityId: number = null;

    @JsonProperty('cityName', String, true)
    cityName: string = null;

    @JsonProperty('districtId', Number, true)
    districtId: number = null;

    @JsonProperty('districtName', String, true)
    districtName: string = null;

    @JsonProperty('address', String, true)
    address: string = null;

    @JsonProperty('websiteUrl', String, true)
    websiteUrl: string = null;

    @JsonProperty('imageUrl', String, true)
    imageUrl: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
