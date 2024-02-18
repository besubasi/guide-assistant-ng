import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('EnumModel')
export class EnumModel {
    @JsonProperty('id', String, true)
    id: string = null;
    @JsonProperty('code', String, true)
    code: string = null;

    constructor(id: string, code: string) {
        this.id = id;
        this.code = code;
    }
}
