import { JsonProperty } from 'json2typescript';

export class DropDownOptionWithDisabled {
    @JsonProperty('value', String, true)
    value: string = null;
    @JsonProperty('label', String, true)
    label: string = null;
    @JsonProperty('label', Boolean, true)
    disabled: boolean = false;
}
