import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'ui-copy-button',
    templateUrl: './ui-copy-button.component.html',
    styleUrls: ['./ui-copy-button.component.scss'],
})
export class UiCopyButtonComponent implements OnInit {
    @Input()
    copyText: string;

    @Input()
    emitCopyEvent: boolean = false;

    @Output() onCopyEvent = new EventEmitter();

    constructor(private clipboard: Clipboard) {}

    ngOnInit(): void {}

    onCopy() {
        if (this.copyText) this.clipboard.copy(this.copyText);

        if (this.emitCopyEvent) this.onCopyEvent.emit();
    }
}
