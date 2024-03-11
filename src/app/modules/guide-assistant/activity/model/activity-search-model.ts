import {JsonObject, JsonProperty} from "json2typescript";
import {BaseSearchModel} from "../../common/model/base-search-model";

@JsonObject('ActivitySearchModel')
export class ActivitySearchModel extends BaseSearchModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('estimatedTime', String, true)
    estimatedTime: string = null;

    @JsonProperty('extra', Boolean, true)
    extra: boolean = false;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
