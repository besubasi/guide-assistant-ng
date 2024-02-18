import { JsonProperty, JsonObject } from 'json2typescript';
import { EmptyControl, NotBlank } from '@hvlng/framework-bff/core';

@JsonObject('KovanInfastructureKovanBpmnProcessTerminationModel')
export class KovanBpmnProcessTerminationModel {
    @NotBlank()
    @JsonProperty('processInstanceId', String, true)
    processInstanceId: string = null;

    @NotBlank()
    @JsonProperty('deleteReason', String, true)
    deleteReason: string = null;
}
