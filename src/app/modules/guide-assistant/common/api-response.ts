import {MessageModel} from "./message-model";
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('ApiResponse')
export class ApiResponse {

    @JsonProperty('body', String, true)
    body: any = null;

    @JsonProperty('messageList', [MessageModel], true)
    messageList: MessageModel[] = null;

}
