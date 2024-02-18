import { JsonObject, JsonProperty } from 'json2typescript';
import { MaxLength, NotBlank } from '@hvlng/framework-bff/core';

@JsonObject('KovanInfastructureUiDefinitionModel')
export class UiDefinitionModel {
    @NotBlank()
    @MaxLength(100)
    @JsonProperty('definition', String, true)
    definition: string = null;
}
