import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../common/model/base-model";

@JsonObject('PricingTypeModel')
export class PricingTypeModel extends BaseModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
