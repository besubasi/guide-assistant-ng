import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PreloaderService } from './ui-preloader.service';

@Component({
    selector: 'ui-preloader',
    templateUrl: './ui-preloader.component.html',
    styleUrls: ['./ui-preloader.component.scss'],
})
export class UiPreloaderComponent implements OnInit {
    subscription: Subscription;
    visible: boolean;

    constructor(private readonly preloaderService: PreloaderService) {
        this.subscription = this.preloaderService.getHandler.subscribe((response) => {
            this.visible = response;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
