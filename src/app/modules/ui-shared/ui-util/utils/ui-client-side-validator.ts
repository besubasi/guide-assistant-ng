import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';

export function uiClientSideValidator(group: UntypedFormGroup | UntypedFormArray) {
    group.markAsDirty();
    Object.keys(group.controls).forEach((key: string) => {
        if (group.controls[key].status === 'INVALID') {
            console.log(key, 'is invalid!');
        }
        const abstractControl = group.controls[key];
        if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
            uiClientSideValidator(abstractControl);
        } else {
            abstractControl.markAsDirty();
        }
    });
}

export function uiClientSideValidatorAny(group: any) {
    if (group instanceof UntypedFormGroup) {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.controls[key];
            if (abstractControl instanceof UntypedFormGroup) {
                uiClientSideValidatorAny(abstractControl);
            } else {
                abstractControl.clearValidators();
                abstractControl.updateValueAndValidity();
            }
        });
    }
}
