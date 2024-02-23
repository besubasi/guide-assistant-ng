import {JsonObject, JsonProperty} from "json2typescript";

import {BaseModel} from "../../../common/model/base-model";

@JsonObject('TourModel')
export class TourModel extends BaseModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('tourTypeId', Number, true)
    tourTypeId: number = null;

    @JsonProperty('code', String, true)
    code: string = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('day', String, true)
    day: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
