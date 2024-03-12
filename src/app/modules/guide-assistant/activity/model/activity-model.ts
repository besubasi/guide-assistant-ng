import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../common/model/base-model";

@JsonObject('ActivityModel')
export class ActivityModel extends BaseModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('estimatedTime', String, true)
    estimatedTime: string = null;

    @JsonProperty('extra', Boolean, true)
    extra: boolean = false;

    @JsonProperty('contentUrl', String, true)
    contentUrl: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
