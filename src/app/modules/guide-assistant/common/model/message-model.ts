import {JsonObject, JsonProperty} from "json2typescript";
import {EnumMessageType} from "../enum/enum-message-type";

@JsonObject('MessageModel')
export class MessageModel {

    @JsonProperty('type', String, true)
    type: EnumMessageType = null;

    @JsonProperty('key', String, true)
    key: String = null;

    @JsonProperty('parameters', [], true)
    parameters: any[] = null;

}
