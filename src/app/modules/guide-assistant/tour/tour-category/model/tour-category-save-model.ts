import {JsonObject, JsonProperty} from 'json2typescript';
import {BaseModel} from "../../../common/model/base-model";

@JsonObject('TourCategorySaveModel')
export class TourCategorySaveModel extends BaseModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;

}
