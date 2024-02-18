import { JsonProperty, JsonObject } from 'json2typescript';
import { HvlDateConverter } from '@hvlng/framework-bff/util';
import { EmptyControl } from '@hvlng/framework-bff/core';
import { EnumTaskStatus, EnumTaskStatusConverter } from './enum-task-status';

@JsonObject('KovanInfastructureHvlTaskModel')
export class HvlTaskModel {
    @EmptyControl()
    @JsonProperty('id', String, true)
    id: string = null;

    @JsonProperty('parentId', String, true)
    parentId: string = null;

    @EmptyControl()
    @JsonProperty('processInstanceId', String, true)
    processInstanceId: string = null;

    @EmptyControl()
    @JsonProperty('key', String, true)
    key: string = null;

    @EmptyControl()
    @JsonProperty('formKey', String, true)
    formKey: string = null;

    @EmptyControl()
    @JsonProperty('owner', String, true)
    owner: string = null;

    @EmptyControl()
    @JsonProperty('taskName', String, true)
    taskName: string = null;

    @EmptyControl()
    @JsonProperty('businessKey', String, true)
    businessKey: string = null;

    @EmptyControl()
    @JsonProperty('description', String, true)
    description: string = null;

    @EmptyControl()
    @JsonProperty('category', String, true)
    category: string = null;

    @EmptyControl()
    @JsonProperty('delegationState', String, true)
    delegationState: string = null;

    @EmptyControl()
    @JsonProperty('priority', Number, true)
    priority: number = null;

    @EmptyControl()
    @JsonProperty('createTime', HvlDateConverter, true)
    createTime: Date = null;

    @EmptyControl()
    @JsonProperty('dueDate', HvlDateConverter, true)
    dueDate: Date = null;

    @EmptyControl()
    @JsonProperty('endDate', HvlDateConverter, true)
    endDate: Date = null;

    @EmptyControl()
    @JsonProperty('processDefinitionName', String, true)
    processDefinitionName: string = null;

    @EmptyControl()
    @JsonProperty('processDefinitionKey', String, true)
    processDefinitionKey: string = null;

    @EmptyControl()
    @JsonProperty('processDefinitionId', String, true)
    processDefinitionId: string = null;

    @EmptyControl()
    @JsonProperty('processInstanceName', String, true)
    processInstanceName: string = null;

    @EmptyControl()
    @JsonProperty('processStatus', String, true)
    processStatus: string = null;

    @EmptyControl()
    @JsonProperty('starterUserInfo', Object, true)
    starterUserInfo: Object = null;

    @EmptyControl()
    @JsonProperty('historicTask', Boolean, true)
    historicTask: boolean = null;
}
