import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { uiClientSideValidator } from '../ui-util/utils/ui-client-side-validator';
import { JsonConvert } from 'json2typescript';

@Component({
    selector: 'ui-advance-search-footer-buttons',
    templateUrl: './ui-advance-search-footer-buttons.component.html',
})
export class UiAdvanceSearchFooterButtonsComponent implements OnInit {
    loading = signal(false);

    @Input() idPrefix: string;
    @Input() clearButtonDisabled: boolean = false;
    @Input() searchButtonDisabled: boolean = false;
    @Input() remember: boolean = false;
    @Input() checkFormIsValid: boolean = false;
    @Input() enterSubmit: boolean = true;
    @Input() rememberMeModel: any;

    /**
     * NOT: form inputunun sürekli dinlenmesi ihtiyacı, özellikle cascade form elemanlarının zorunlu form itemları forma dahil olduğunda
     * form validasyonunun, sonradan required olarak eklenen form elemanının validasyonunu da görmesi için yapıldı.
     */
    private _form: UntypedFormGroup;
    @Input() set form(value: UntypedFormGroup) {
        if (value === this._form) return;
        this._form = value;
    }

    get form(): UntypedFormGroup {
        return this._form;
    }

    @Output() onClear = new EventEmitter();
    @Output() onSearch = new EventEmitter();
    @Output() onRemember = new EventEmitter<any>();

    ngOnInit(): void {
        if (this.remember) {
            let storage = this.getStorage();
            if (storage) {
                this.onRemember.emit(this.getStorage());
            }
        }
    }

    private doSearch() {
        this.loading.set(true);
        if (this.remember && this.form.valid) {
            this.setStorage();
        }
        this.onSearch.emit();

        setTimeout(() => {
            this.loading.set(false);
        }, 1500);
    }

    search() {
        if (this.checkFormIsValid) {
            if (Array.isArray(this.form)) {
                this.form.forEach((objForm) => {
                    this.setValidatorOrEmit(objForm);
                });
            } else {
                this.setValidatorOrEmit(this.form);
            }
        } else {
            this.doSearch();
        }
    }

    private setValidatorOrEmit(group: UntypedFormGroup) {
        if (group && group.invalid) {
            uiClientSideValidator(group);
        } else {
            this.doSearch();
        }
    }

    setStorage() {
        localStorage.setItem('search_' + this.idPrefix, JSON.stringify(this.form.value));
    }

    getStorage() {
        let getItem = localStorage.getItem('search_' + this.idPrefix);
        getItem = JSON.parse(getItem);
        const converter = new JsonConvert();
        let convertedData = converter.deserializeObject(getItem, this.rememberMeModel);
        return convertedData;
    }

    clearStorage() {
        localStorage.removeItem('search_' + this.idPrefix);
    }

    clear() {
        if (this.remember) {
            this.clearStorage();
        }
        this.onClear.emit();
    }
}
