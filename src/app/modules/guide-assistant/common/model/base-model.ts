import {JsonProperty} from 'json2typescript';

export class BaseModel {

    @JsonProperty('id', Number, true)
    id: number = null;

}
