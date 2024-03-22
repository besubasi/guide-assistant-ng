import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../../../../common/model/base-model";

@JsonObject('ActivityCompanyRelSaveModel')
export class ActivityCompanyRelSaveModel extends BaseModel {

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('activityCompanyId', Number, true)
    activityCompanyId: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
