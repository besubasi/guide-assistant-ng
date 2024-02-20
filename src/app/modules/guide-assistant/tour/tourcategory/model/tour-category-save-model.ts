import {JsonObject, JsonProperty} from 'json2typescript';
import {Validators} from "@angular/forms";

@JsonObject('TourCategorySaveModel')
export class TourCategorySaveModel {

    @JsonProperty('companyId', Number, true)
    companyId: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

    @JsonProperty('active', Boolean, true)
    active: boolean = true;


    static getValidationRules() {
        return {
            companyId: [Validators.required],
            name: [Validators.required],
            age: [Validators.nullValidator]
        };
    }

}
