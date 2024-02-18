import { HvlDateConverter, HvlMapConverter } from '@hvlng/framework-bff/util';
import { JsonProperty, JsonObject } from 'json2typescript';
import { EmptyControl, NotBlank } from '@hvlng/framework-bff/core';

@JsonObject('KovanInfastructureHvlRuntimeProcessModel')
export class HvlRuntimeProcessModel {
    @EmptyControl()
    @JsonProperty('id', String, true)
    id: string = null;

    @NotBlank()
    @JsonProperty('key', String, true)
    key: string = null;

    @EmptyControl()
    @JsonProperty('businessKey', String, true)
    businessKey: string = null;

    @EmptyControl()
    @JsonProperty('startTime', HvlDateConverter, true)
    startTime: Date = null;

    @EmptyControl()
    @JsonProperty('executionId', String, true)
    executionId: string = null;

    @JsonProperty('processVariables', HvlMapConverter, true)
    processVariables: Map<string, any> = new Map<string, any>();
}
