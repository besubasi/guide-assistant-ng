import {JsonObject, JsonProperty} from "json2typescript";
import {ActivityTariffSaveModel} from "./activity-tariff-save-model";

@JsonObject('ActivityTariffModel')
export class ActivityTariffModel extends ActivityTariffSaveModel {

    @JsonProperty('pricingTypeCode', String, true)
    pricingTypeCode: string = null;

    @JsonProperty('pricingTypeName', String, true)
    pricingTypeName: string = null;

    @JsonProperty('currencyCode', String, true)
    currencyCode: string = null;

    @JsonProperty('currencyName', String, true)
    currencyName: string = null;

}
