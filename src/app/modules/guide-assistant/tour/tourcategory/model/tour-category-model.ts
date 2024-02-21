import {JsonObject, JsonProperty} from 'json2typescript';
import {TourCategorySaveModel} from "./tour-category-save-model";

@JsonObject('TourCategoryModel')
export class TourCategoryModel extends TourCategorySaveModel {

    @JsonProperty('companyCode', String, true)
    companyCode: string = null;

    @JsonProperty('companyName', String, true)
    companyName: string = null;

}
