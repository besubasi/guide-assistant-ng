import {JsonObject, JsonProperty} from "json2typescript";

import {BaseSearchModel} from "../../../guide-assistant/common/model/base-search-model";

@JsonObject('LanguageSearchModel')
export class LanguageSearchModel extends BaseSearchModel {

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = null;

}
