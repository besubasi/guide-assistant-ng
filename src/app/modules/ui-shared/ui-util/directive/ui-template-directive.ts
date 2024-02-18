import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[hvlngTemplate]',
    host: {},
})

/**
 * @description
 * template yönetimi sağlayan directive
 */
export class UiTemplateDirective {
    /** @description template tipi */
    @Input() type: string;

    /** @description master detail gibi componentlerde template adı vererek ayrışım yapılabilmesini sağlar */
    @Input('hvlngTemplate') name: string;

    constructor(public template: TemplateRef<any>) {}

    getType(): string {
        return this.name;
    }
}
