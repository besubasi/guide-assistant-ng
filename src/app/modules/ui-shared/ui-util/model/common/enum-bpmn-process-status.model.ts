import { JsonConverter } from 'json2typescript';
import { HvlEnumConverter } from '@hvlng/framework-bff/util';

export enum EnumBpmnProcessStatus {
    EDIT = 'EDIT',
    CONTROL = 'CONTROL',
    APPROVE = 'APPROVE',
}

@JsonConverter
export class EnumBpmnProcessStatusConverter extends HvlEnumConverter<EnumBpmnProcessStatus> {
    constructor() {
        super(EnumBpmnProcessStatus, 'EnumBpmnProcessStatus');
    }
}

export const EnumBpmnProcessStatusResourceKey = 'processAndTask.enumBpmnProcessStatus';
