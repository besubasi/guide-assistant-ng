import {JsonObject, JsonProperty} from "json2typescript";
import {BaseSearchModel} from "../../../../../common/model/base-search-model";


@JsonObject('ActivityCompanyRelSearchModel')
export class ActivityCompanyRelSearchModel extends BaseSearchModel {

    @JsonProperty('activityId', Number, true)
    activityId: number = null;

    @JsonProperty('activityCompanyId', Number, true)
    activityCompanyId: number = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
