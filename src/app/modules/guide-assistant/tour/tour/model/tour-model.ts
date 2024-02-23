import {JsonObject, JsonProperty} from "json2typescript";
import {TourSaveModel} from "./tour-save-model";

@JsonObject('TourModel')
export class TourModel extends TourSaveModel {

    @JsonProperty('companyCode', String, true)
    companyCode: string = null;

    @JsonProperty('companyName', String, true)
    companyName: string = null;

    @JsonProperty('tourTypeName', String, true)
    tourTypeName: string = null;

    @JsonProperty('tourCategoryName', String, true)
    tourCategoryName: string = null;

}
