import {UntypedFormArray, UntypedFormGroup} from '@angular/forms';

export class Util {

    static validate(group: UntypedFormGroup | UntypedFormArray): boolean {
        let isValid = true;
        group.markAsDirty();
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.controls[key];
            if (abstractControl.status == 'INVALID') {
                isValid = false;
                console.log(key + ' is invalid.');
            }

            if (abstractControl instanceof UntypedFormGroup || abstractControl instanceof UntypedFormArray) {
                this.validate(abstractControl);
            } else {
                abstractControl.markAsDirty();
            }
        });
        return isValid;
    }

    static getDayStart(date: Date): Date {
        return date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)) : null;
    }

    static getDayEnd(date: Date): Date {
        return date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)) : null;
    }

    static clone<T>(TCreator: { new(): T }, model: T): T {
        return Object.assign(new TCreator(), structuredClone(model));
    }

}
