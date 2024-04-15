import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../../guide-assistant/common/model/base-model";
import {EnumRoleType} from "../enum/enum-role-type";

@JsonObject('UserModel')
export class UserModel extends BaseModel {

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('password', String, true)
    password: string = null;

    @JsonProperty('phoneNumber', String, true)
    phoneNumber: string = null;

    @JsonProperty('email', String, true)
    email: string = null;

    @JsonProperty('languageId', Number, true)
    languageId: number = null;

    @JsonProperty('roleType', String, true)
    roleType: EnumRoleType = EnumRoleType.TRAVELER;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;
}
