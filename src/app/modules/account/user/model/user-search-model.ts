import {JsonObject, JsonProperty} from "json2typescript";
import {BaseSearchModel} from "../../../guide-assistant/common/model/base-search-model";

@JsonObject('UserSearchModel')
export class UserSearchModel extends BaseSearchModel {

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('userName', String, true)
    userName: string = null;

    @JsonProperty('password', String, true)
    password: string = null;

    @JsonProperty('phoneNumber', String, true)
    phoneNumber: string = null;

    @JsonProperty('email', String, true)
    email: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
