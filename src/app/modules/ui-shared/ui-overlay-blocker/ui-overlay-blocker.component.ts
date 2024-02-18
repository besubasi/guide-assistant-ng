import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-overlay-blocker',
    templateUrl: './ui-overlay-blocker.component.html',
    styleUrls: ['./ui-overlay-blocker.component.scss'],
})
/**
 * @description Ekranlarda belli alan(lar)ın bir duruma kadar üzerine overlay katmanı koyarak ve kullanıcıya mesaj vererek yönlendiren UX componentidir
 */
export class UiOverlayBlockerComponent implements OnInit {
    @Input() text: string;
    @Input() show: boolean = true;

    constructor() {}

    ngOnInit(): void {}
}
