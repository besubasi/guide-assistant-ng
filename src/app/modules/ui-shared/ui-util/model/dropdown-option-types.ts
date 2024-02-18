import { JsonObject, JsonProperty, Any } from 'json2typescript';

@JsonObject('KovanInfastructureDropdownOptionTypes')
export class DropdownOptionTypes {
    @JsonProperty('value', Any, true)
    value: boolean | number | string = null;

    @JsonProperty('label', String, true)
    label: string = null;
}
