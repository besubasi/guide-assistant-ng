import { JsonProperty } from 'json2typescript';

export class DropdownOptionNumber {
    @JsonProperty('value', Number, true)
    value: number = null;
    @JsonProperty('label', String, true)
    label: string = null;
}
