import { JsonProperty, JsonObject } from 'json2typescript';
import { HvlQueryModel } from '@hvlng/framework-bff/core';
import { EmptyControl } from '@hvlng/framework-bff/core';
import { HvlDateConverter } from '@hvlng/framework-bff/util';
import { EnumTaskStatus, EnumTaskStatusConverter } from './enum-task-status';

@JsonObject('KovanInfastructureHvlTaskQueryModel')
export class HvlTaskQueryModel extends HvlQueryModel {
    @EmptyControl()
    @JsonProperty('key', String, true)
    key?: string = null;

    @EmptyControl()
    @JsonProperty('description', String, true)
    description?: string = null;

    @EmptyControl()
    @JsonProperty('category', String, true)
    category?: string = null;

    @EmptyControl()
    @JsonProperty('delegationState', String, true)
    delegationState?: string = null;

    /*NEW*/

    @EmptyControl()
    @JsonProperty('processId', String, true)
    processId?: string = null;

    @EmptyControl()
    @JsonProperty('referance', String, true)
    referance?: string = null;

    @EmptyControl()
    @JsonProperty('approvalStatus', EnumTaskStatusConverter, true)
    approvalStatus?: EnumTaskStatus = null;

    @EmptyControl()
    @JsonProperty('createTime', HvlDateConverter, true)
    createTime?: Date = null;

    @EmptyControl()
    @JsonProperty('completionTime', HvlDateConverter, true)
    completionTime?: Date = null;

    @EmptyControl()
    @JsonProperty('priority', Number, true)
    priority?: number = null;

    @EmptyControl()
    @JsonProperty('userIntegrationCode', String, true)
    userIntegrationCode?: string = null;

    @EmptyControl()
    @JsonProperty('referanceNumber', String, true)
    referanceNumber?: string = null;
}
