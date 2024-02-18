import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('KovanInfastructureDropdownOption')
export class DropdownOption {
    @JsonProperty('value', String, true)
    value: string = null;
    @JsonProperty('label', String, true)
    label: string = null;
}
