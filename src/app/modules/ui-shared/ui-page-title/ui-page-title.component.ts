import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
    selector: 'ui-page-title',
    templateUrl: './ui-page-title.component.html',
    styleUrls: ['./ui-page-title.component.scss'],
})
export class UiPageTitleComponent implements OnInit {
    moreItems: MenuItem[];

    private _pageCode: string;
    /** @description sayfa kodu verilmelidir */
    @Input() set pageCode(value: string) {
        if (value === this._pageCode) return;
        this._pageCode = value;
    }

    get pageCode(): string {
        return this._pageCode;
    }

    private _moreActions: MenuItem[];
    /** @description üç nokta ikonuna tıklandığında açılan menünün içeriğini belirler, menuItem tipinde olması gerekir */
    @Input() set moreActions(value: MenuItem[]) {
        if (value === this._moreActions) return;
        this._moreActions = value;
    }

    get moreActions(): MenuItem[] {
        return this._moreActions;
    }

    @Input() title: string;
    @Input() titleDetail: string;
    @Input() widget: boolean = false;
    /**
     * @description
     * başlık içeriğinin ne kadar genişlikte (default: col-8) olması gerektiğini belirler.
     * Bu genişliği aşan içerikler css ile truncate edilir ve üç nokta eklenir*/
    @Input() titleClass: string;

    /**
     * @description defaultu değeri "false". component, bir modal/popup içinde kullanılacağı durumda appendTo="body" yerine bulunduğu kısma append olması için ayarlanması gereklidir.
     */
    @Input() inModal: boolean = false;
    /**
     * @description Geri Dön düğmesinin görünümünü ayarlar
     */
    @Input() showBack: boolean = false;
    /**
     * @description Kapat düğmesinin görünümünü ayarlar
     */
    @Input() showClose: boolean = false;
    /**
     * @description Üç nokta (daha fazla) düğmesinin görünümünü ayarlar
     */
    @Input() showMore: boolean = true;
    /**
     * @description Widgetlarda kullanılan link özelliğidir
     */
    @Input() showRedirect: boolean = false;
    @Input() redirectUrl: string;

    /**
     * @description Geri dön düğmesine basıldığında tetiklenir
     */
    @Output() onBack = new EventEmitter();
    /**
     * @description Kapat düğmesine basıldığında tetiklenir
     */
    @Output() onClose = new EventEmitter();

    /**
     * @description defaultu değeri "false". Modal header için eklendiğinde setlenecek
     */
    @Input() showModalHeader: boolean = false;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
        if (this.widget) {
            this.showMore = false;
        }
    }

    close() {
        this.onClose.emit();
    }

    goBack() {
        this.onBack.emit();
    }

    copyToClipboard(item) {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', item);
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }

    redirect() {
        this.router.navigate([this.redirectUrl]);
    }

}
