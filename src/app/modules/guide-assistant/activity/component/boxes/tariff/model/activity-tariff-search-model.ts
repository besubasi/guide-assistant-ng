import {JsonObject, JsonProperty} from "json2typescript";
import {BaseSearchModel} from "../../../../../common/model/base-search-model";


@JsonObject('ActivityTariffSearchModel')
export class ActivityTariffSearchModel extends BaseSearchModel {

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('pricingTypeId', Number, true)
    pricingTypeId: number = null;

    @JsonProperty('currencyId', Number, true)
    currencyId: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
