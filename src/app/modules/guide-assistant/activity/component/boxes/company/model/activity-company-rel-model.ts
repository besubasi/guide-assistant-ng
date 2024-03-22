import {JsonObject, JsonProperty} from "json2typescript";
import {ActivityCompanyRelSaveModel} from "./activity-company-rel-save-model";

@JsonObject('ActivityCompanyRelModel')
export class ActivityCompanyRelModel extends ActivityCompanyRelSaveModel {

    @JsonProperty('activityCompanyName', String, true)
    activityCompanyName: string = null;

}
