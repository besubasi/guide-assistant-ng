import {Component, Input, OnInit} from '@angular/core';

@Component({
    styleUrls: ['./ui-card-item.component.scss'],
    selector: 'ui-card-item',
    template: `
        <p-card
            class="ui-card-item-wrapper"
            [ngClass]="isDisabledCard ? 'ui-card-item-disabled' : isSelectedCard ? 'ui-card-item-selected' : ''"
        >
            <div
                class="content-wrapper"
                [ngClass]="isHorizontalCard ? 'horizontal-content-wrapper' : 'default-content-wrapper'"
            >
                <div class="container" [style.height]="!isHorizontalCard ? height + 'px' : ''">
                    <div class="title">
                        {{ title }}
                    </div>
                    <div class="desc" *ngIf="desc">
                        {{ desc }}
                    </div>
                    <!-- ng-content içini dolduracak developer p-col açıp içine istediği içeriği koymalı. -->
                    <ng-container *ngIf="!defaultMode">
                        <ng-content></ng-content>
                    </ng-container>
                </div>
            </div>
        </p-card>
    `,
})

/**
 * @description
 * Kutu görünümüne sahip, title ve desc bilgisini gösteren veya bağımsız içerik alabilen componenttir.
 */
export class UiCardItemComponent implements OnInit {
    /** @description default görünümde başlık ve açıklama kısımlarını gösterir. default false işaretlendiğinde ng-content alır ve kullanan tarafından içerik alınır*/
    @Input() defaultMode: boolean = true;

    /** @description kartların sol üstünde aktif/pasif gibi durum bilgisi veren nokta işaretinin görünüp görünmeyeceği bilgisi */
    @Input() showCircle: boolean = true;

    /** @description kart başlığı */
    @Input() title: string;

    /** @description kart açıklaması */
    @Input() desc: string;

    /** @description showCircle=true olduğunda circleColor alanı doldurulur, nokta işaretinin rengi belirtilir */
    @Input() circleColor: 'yellow' | 'red' | 'blue' | 'green' | 'orange' | 'gray' = 'gray';

    /** @description default yükseklik 120px dir. Eğer kartlar daha uzun/kısa açılması gerekiyorsa bu alan verilmelidir. */
    @Input() height: string = '120';

    /** @description kartların disable olma durumunu kontrol eder */
    @Input() isDisabledCard: boolean = false;

    @Input() isSelectedCard = false;

    /** @description kartın horizontally mode ile acilmasini kontrol eder */
    @Input() isHorizontalCard: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }
}
