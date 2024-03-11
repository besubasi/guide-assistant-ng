import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('LookupModel')
export class LookupModel {
    @JsonProperty('id', Number, true)
    id: number = null;

    @JsonProperty('name', String, true)
    name: string = null;

}
