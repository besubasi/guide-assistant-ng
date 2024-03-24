import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../../guide-assistant/common/model/base-model";

@JsonObject('LanguageModel')
export class LanguageModel extends BaseModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
