import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {Subscription} from "rxjs";

import {UserRestService} from "../service/user-rest-service";
import {UserSearchModel} from "../model/user-search-model";
import {PasswordModule} from "primeng/password";
import {UiSharedModule} from "../../../ui-shared/ui-shared.module";
import {PageCode} from "../../../guide-assistant/common/enum/page-code";
import {FormMode} from "../../../guide-assistant/common/enum/form-mode";
import {LookupModel} from "../../../guide-assistant/common/model/lookup-model";
import {LanguageRestService} from "../../language/service/language-rest-service";
import {LanguageSearchModel} from "../../language/model/language-search-model";
import {CompanyRestService} from "../../../guide-assistant/company/service/company-rest-service";
import {CompanySearchModel} from "../../../guide-assistant/company/model/company-search-model";
import {MultiSelectModule} from "primeng/multiselect";
import {EnumRoleType} from "../enum/enum-role-type";
import {GuideUserModel} from "../model/guide-user-model";
import {UserModel} from "../model/user-model";

@Component({
    selector: 'app-user-page',
    standalone: true,
    imports: [
        NgStyle,
        ButtonModule,
        CurrencyPipe,
        MenuModule,
        SharedModule,
        TableModule,
        ChartModule,
        InputTextModule,
        ReactiveFormsModule,
        NgIf,
        ToolbarModule,
        CardModule,
        CheckboxModule,
        RippleModule,
        DividerModule,
        UiSharedModule,
        InputNumberModule,
        DropdownModule,
        PasswordModule,
        MultiSelectModule,
    ],
    templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit, OnDestroy {

    pageCode: string;
    formMode: string;
    form: UntypedFormGroup;
    list: UserModel[];
    selectedItem: UserModel;
    subscriptions: Subscription[];
    companyList: LookupModel[];
    languageList: LookupModel[];

    constructor(
        private formBuilder: FormBuilder,
        private restService: UserRestService,
        private companyService: CompanyRestService,
        private languageRestService: LanguageRestService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE
        this.subscriptions = [];
        this.pageCode = PageCode.COUNTRY;

        this.buildForm();
        this.loadCompanyList();
        this.loadLanguageList();
        this.loadListData();
    }


    ngOnDestroy(): void {
        this.subscriptions?.forEach(x => x.unsubscribe());
    }

    buildForm() {
        this.form = this.formBuilder.group(new GuideUserModel());
    }


    loadCompanyList() {
        let searchModel: CompanySearchModel = new CompanySearchModel();
        searchModel.active = true;
        let subscription = this.companyService.getLookupList(searchModel).subscribe((response => {
            this.companyList = response;
        }));
        this.subscriptions.push(subscription);
    }

    loadLanguageList() {
        const subscription = this.languageRestService.getList(new LanguageSearchModel()).subscribe((response) => {
            this.languageList = response;
        });
        this.subscriptions.push(subscription);
    }

    loadListData() {
        const subscription = this.restService.getList(new UserSearchModel()).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    loadUserCompanyRelList() {
        const subscription = this.restService.getList(new UserSearchModel()).subscribe((response) => {
            this.list = response;
        });
        this.subscriptions.push(subscription);
    }

    onAdd() {
        this.formMode = FormMode.ADD;
        this.buildForm();
    }

    onCopy() {
        this.formMode = FormMode.COPY;
        this.buildForm();
        this.form.patchValue(this.selectedItem);
        this.form.patchValue({id: null});
    }

    onEdit() {
        this.formMode = FormMode.EDIT;
        this.buildForm();
        this.form.patchValue(this.selectedItem);
    }

    onDelete() {
        this.restService.deleteById(this.selectedItem?.id).subscribe(() => {
            this.onCancel();
            this.loadListData();
            this.messageService.add({severity: 'success', summary: 'Success', detail: "Kayıt başarıyla silindi"});
        });
    }

    onCancel() {
        this.formMode = FormMode.NONE;
        this.form.reset();
        this.buildForm();
    }

    onSave() {
        let subscription = this.restService.save(this.form.value).subscribe(
            response => {
                this.onCancel();
                this.loadListData();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: "İşlem başarıyla kaydedildi."
                });
            }
        );
        this.subscriptions.push(subscription);
    }

    get FormMode() {
        return FormMode;
    }

    getRoleTypeName(enumRoleType: EnumRoleType) {
        if (EnumRoleType.TRAVELER === enumRoleType)
            return 'Gezgin'
        else if (EnumRoleType.GUIDE === enumRoleType)
            return 'Rehber'
        else if (EnumRoleType.COMPANY_OPERATOR === enumRoleType)
            return 'Şirket Operatörü'
        else if (EnumRoleType.ADMIN === enumRoleType)
            return 'Admin'
        else
            return '';
    }
}
