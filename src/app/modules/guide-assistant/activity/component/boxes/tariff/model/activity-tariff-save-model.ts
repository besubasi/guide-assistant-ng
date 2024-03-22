import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "src/app/modules/guide-assistant/common/model/base-model";

@JsonObject('ActivityTariffSaveModel')
export class ActivityTariffSaveModel extends BaseModel {

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('pricingTypeId', Number, true)
    pricingTypeId: number = null;

    @JsonProperty('startDate', String, true)
    startDate: string = null;

    @JsonProperty('description', String, true)
    description: string = null;

    @JsonProperty('amount', Number, true)
    amount: number = null;

    @JsonProperty('currencyId', Number, true)
    currencyId: number = null;

    @JsonProperty('commissionRate', Number, true)
    commissionRate: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
