import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    styleUrls: ['./ui-empty-state.component.scss'],
    selector: 'ui-empty-state',
    templateUrl: './ui-empty-state.component.html',
})
export class UiEmptyStateComponent {
    /**
     * Watch Button is Disabled or Not
     */
    @Input() isDisabledButton: boolean = false;

    /**
     * Main title h4
     */
    @Input() mainTitleText: string;

    /**
     * Sub title span
     */
    @Input() subTitleText: string;

    /**
     * Show save button
     */
    @Input() showSaveButton: boolean = true;

    /**
     * Save button label
     */
    @Input() saveButtonLabel: string;

    /**
     * Add Event Handler
     */
    @Output() onAddEvent = new EventEmitter();

    addHandler() {
        this.onAddEvent.emit();
    }
}
