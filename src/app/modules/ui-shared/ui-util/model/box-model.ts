export class BoxModel {
    pageName: string = null;
    navigationParameter:string=null;
    ledgerCardClass:string=null;
    dotIconClass:string=null;
    constructor(pageName:string,navigationParameter:string,ledgerCardClass:string,dotIconClass:string) {
        this.pageName=pageName;
        this.navigationParameter=navigationParameter;
        this.ledgerCardClass=ledgerCardClass;
        this.dotIconClass=dotIconClass;
    }
}
