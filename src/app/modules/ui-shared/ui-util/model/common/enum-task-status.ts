import { HvlEnumConverter } from '@hvlng/framework-bff/util';
import { JsonConverter } from 'json2typescript';

export enum EnumTaskStatus {
    COMPLETED = 'COMPLETED',
    NOTCOMPLETED = 'NOTCOMPLETED',
}

@JsonConverter
export class EnumTaskStatusConverter extends HvlEnumConverter<EnumTaskStatus> {
    constructor() {
        super(EnumTaskStatus, 'EnumTaskStatus');
    }
}
export const EnumTaskStatusResourceKey = 'infraTaskAssignee.enumTaskStatus';
