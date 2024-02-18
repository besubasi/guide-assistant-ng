import { HvlEnumConverter } from '@hvlng/framework-bff/util';
import { JsonConverter } from 'json2typescript';

export enum EnumBpmnCategory {
    FINANCE = 'fin',
    LOGISTIC = 'logistic',
    HR = 'hr',
    INTEGRATION = 'integration',
    CROSSAPP = 'crossapplication',
}

@JsonConverter
export class EnumBpmnCategoryConverter extends HvlEnumConverter<EnumBpmnCategory> {
    constructor() {
        super(EnumBpmnCategory, 'EnumBpmnCategory');
    }
}

export const EnumBpmnCategoryResourceKey = 'processAndTask.enumBpmnCategory';
