import {JsonObject, JsonProperty} from 'json2typescript';
import {BaseModel} from "../../common/model/base-model";

@JsonObject('ActivityCompanyModel')
export class ActivityCompanyModel extends BaseModel {

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('address', String, true)
    address: string = null;

    @JsonProperty('phoneNumber', String, true)
    phoneNumber: string = null;

    @JsonProperty('firstUser', String, true)
    firstUser: string = null;

    @JsonProperty('firstUserPhone', String, true)
    firstUserPhone: string = null;

    @JsonProperty('firstUserEmail', String, true)
    firstUserEmail: string = null;

    @JsonProperty('secondUser', String, true)
    secondUser: string = null;

    @JsonProperty('secondUserPhone', String, true)
    secondUserPhone: string = null;

    @JsonProperty('secondUserEmail', String, true)
    secondUserEmail: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
