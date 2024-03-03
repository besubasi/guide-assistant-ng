export class BoxModel {
    pageCode: string = null;
    title: string = null
    disabled: boolean = false

    constructor(pageCode: string, title: string, disabled?: boolean) {
        this.pageCode = pageCode;
        this.title = title;
        this.disabled = disabled ?? false;
    }
}
