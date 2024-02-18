import { JsonProperty, JsonObject } from 'json2typescript';
import { EmptyControl, NotBlank } from '@hvlng/framework-bff/core';
import { HvlTaskModel } from './hvl-task-model';
import { EnumBpmnProcessStatus, EnumBpmnProcessStatusConverter } from './enum-bpmn-process-status.model';
import { EnumBpmnActionType, EnumBpmnActionTypeConverter } from './enum-bpmn-action-type';

@JsonObject('KovanInfastructureKovanTaskModel')
export class KovanTaskModel extends HvlTaskModel {
    @NotBlank()
    @JsonProperty('key', String, true)
    key: string = null;

    @EmptyControl()
    @JsonProperty('comment', String, true)
    comment: string = null;

    @EmptyControl()
    @JsonProperty('bpmnProcessStatus', EnumBpmnProcessStatusConverter, true)
    bpmnProcessStatus: EnumBpmnProcessStatus = null;

    @EmptyControl()
    @JsonProperty('bpmnState', EnumBpmnActionTypeConverter, true)
    bpmnState: EnumBpmnActionType = null;

    @EmptyControl()
    @JsonProperty('completeEndPointPath', String, true)
    completeEndPointPath: string = null;
}
