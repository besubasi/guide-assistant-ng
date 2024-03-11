import {JsonObject, JsonProperty} from "json2typescript";
import {BaseModel} from "../../../common/model/base-model";

@JsonObject('TourTypeModel')
export class TourTypeModel extends BaseModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('tourCategoryId', Number, true)
    tourCategoryId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('companyCode', String, true)
    companyCode: string = null;

    @JsonProperty('companyName', String, true)
    companyName: string = null;

    @JsonProperty('tourCategoryName', String, true)
    tourCategoryName: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
