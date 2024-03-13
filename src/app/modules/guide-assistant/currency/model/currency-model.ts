import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../common/model/base-model";

@JsonObject('CurrencyModel')
export class CurrencyModel extends BaseModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
