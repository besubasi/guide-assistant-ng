import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('BaseModel')
export class BaseModel {

    @JsonProperty('id', Number, true)
    id: number = null;

}
