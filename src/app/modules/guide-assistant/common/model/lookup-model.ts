import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('LookupModel')
export class LookupModel {
    @JsonProperty('id', String, true)
    id: string = null;

    @JsonProperty('label', String, true)
    label: string = null;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }
}
