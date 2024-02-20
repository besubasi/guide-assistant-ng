import {MessageModel} from "./message-model";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('ApiResponse')
export class ApiResponse {

    @JsonProperty('data', String, true)
    data: any = null;

    @JsonProperty('messageList', [MessageModel], true)
    messageList: MessageModel[] = null;

}
