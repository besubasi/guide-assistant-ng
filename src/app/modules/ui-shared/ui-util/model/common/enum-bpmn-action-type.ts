import { JsonConverter } from 'json2typescript';
import { HvlEnumConverter } from '@hvlng/framework-bff/util';

export enum EnumBpmnActionType {
    DRAFT = 'DRAFT',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED',
    STARTED = 'STARTED',
    WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
    REVISION = 'REVISION',
    REJECTED = 'REJECTED',
    PARTIAL_APPROVED = 'PARTIAL_APPROVED',
    WITHDRAW = 'WITHDRAW',
    DECLINED = 'DECLINED',
    WAGE_WORK_IN_PROGRESS = 'WAGE_WORK_IN_PROGRESS',
    ON_HOLD = 'ON_HOLD',
    SUSPENDED = 'SUSPENDED',
    DELEGATE = 'DELEGATE',
    GET_OPINION = 'GET_OPINION',
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    SEND_FOR_APPROVAL = 'SEND_FOR_APPROVAL',
}

@JsonConverter
export class EnumBpmnActionTypeConverter extends HvlEnumConverter<EnumBpmnActionType> {
    constructor() {
        super(EnumBpmnActionType, 'EnumBpmnActionType');
    }
}

export const EnumBpmnActionTypeResourceKey = 'processAndTask.enumBpmnActionType';
