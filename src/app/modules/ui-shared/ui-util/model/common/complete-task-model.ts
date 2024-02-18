import { HvlMapConverter } from '@hvlng/framework-bff/util';
import { JsonProperty, JsonObject } from 'json2typescript';
import { EmptyControl } from '@hvlng/framework-bff/core';

@JsonObject('KovanInfastructureCompleteTaskModel')
export class CompleteTaskModel {
    @EmptyControl()
    @JsonProperty('taskId', String, true)
    taskId: string = null;

    @JsonProperty('taskParamList', HvlMapConverter, true)
    taskParamList: Map<string, any> = new Map<string, any>();
}
