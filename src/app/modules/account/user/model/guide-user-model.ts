import {EnumRoleType} from "../enum/enum-role-type";
import {JsonProperty} from "json2typescript";
import {UserModel} from "./user-model";

export class GuideUserModel extends UserModel {

    @JsonProperty('roleType', String, true)
    override roleType: EnumRoleType = EnumRoleType.GUIDE;

    @JsonProperty('companyIdList', [Number], true)
    companyIdList: number[] = null;

}
