import { UntypedFormGroup } from '@angular/forms';
import { FormChangeInterface } from './interfaces/form-change-interface';
import { LanguageChangeInterface } from './interfaces/language-change-interface';
import { TranslateService } from '@ngx-translate/core';
import { Optional } from '@angular/core';
import { HvlAbstractOperationalForm, HvlFormConstants } from '@hvlng/framework-core/form';
import { HvlConfigurationService, HvlFormGroup } from '@hvlng/framework-bff/core';
import { HvlLanguageService } from '@hvlng/framework-core/language';

/* @hvlng/framework-core/form icinden aliniyor */
// export class HvlFormConstants {
//     public static EDIT = 'edit';
//     public static COPY = 'copy';
//     public static ADD = 'add';
//     public static LIST = 'list';
//     public static REMOVE = 'remove';
// }

export abstract class KovanMlAbstractOperationalForm<T> extends HvlAbstractOperationalForm {
    private SelectedLanguage: string;

    public get selectedLanguage(): string {
        return this.SelectedLanguage;
    }

    public set selectedLanguage(v: string) {
        this.SelectedLanguage = v;
    }

    private IsMlFormsValid = true;

    public get isMlFormsValid(): boolean {
        return this.IsMlFormsValid;
    }

    public set isMlFormsValid(v: boolean) {
        this.IsMlFormsValid = v;
    }

    private MlForm: UntypedFormGroup;

    public get mlForm(): UntypedFormGroup {
        return this.MlForm;
    }

    public set mlForm(v: UntypedFormGroup) {
        this.MlForm = v;
    }

    DetailMap: Map<string, T>;

    public get detailMap(): Map<string, T> {
        return this.DetailMap;
    }

    public set detailMap(v: Map<string, T>) {
        this.DetailMap = v;
    }

    protected constructor(
        private ctype: new () => T,
        private definitionControlName: string, //kovan
        public configurationService: HvlConfigurationService,
        public definitionMapName: string, //kovan
        @Optional() protected translateService?: TranslateService,
        @Optional() protected languageService?: HvlLanguageService,
    ) {
        super(translateService, configurationService, languageService);
        this.detailMap = new Map<string, T>();
        this.mlForm = new HvlFormGroup<T>(this.getNew()); //kovan
        this.definitionControlName = definitionControlName; //kovan
        this.definitionMapName = definitionMapName;
        this.selectedLanguage = this.configurationService.config.theme.language.system.code; //kovan
    }

    getNew(): T {
        return new this.ctype();
    }

    changeMlValues(language: string, detailMap: T): void {
        this.detailMap.set(language, detailMap);
    }

    selectMlViaLang(language: string): T {
        if (this.detailMap.has(language)) {
            return this.detailMap.get(language);
        } else {
            return this.getNew();
        }
    }

    /**
     *
     * @param formChange
     */
    formChangeDetected(formChange: FormChangeInterface): void {
        if (this.formMode === HvlFormConstants.EDIT) {
            this.changeMlValues(formChange.currentSelectedLanguage, this.MlForm?.value);
            this.IsMlFormsValid = formChange.isFormValid;
        }
    }

    /**
     *
     * @param language
     */
    languageChangeDetected(language: LanguageChangeInterface): void {
        //kovan
        // if (this.formMode === HvlFormConstants.EDIT) {
        //     const hvlBooksDetailModel = this.selectMlViaLang(language.currentSelectedLanguage);
        //     this.mlForm.patchValue(hvlBooksDetailModel);
        //     this.selectedLanguage = language.currentSelectedLanguage;
        // }

        this.setMlFormWhenLangChange(language.currentSelectedLanguage); //kovan
        this.selectedLanguage = language.currentSelectedLanguage; //kovan
    }

    //kovan

    /**
     *
     */
    setDefaultDetailMap() {
        this.selectedLanguage = this.configurationService.config.theme.language.system.code;

        let entity = this.getNew();

        this.configurationService.config.theme.language.supportedLanguages.forEach((value) => {
            this.detailMap.set(value.code, entity);
        });
    }

    //kovan
    /**
     *
     * @param selectedModel
     *
     */
    setMlFormWhenEditCopy(selectedModel, state?: string) {
        let clonedModel = Object.assign({}, selectedModel);
        let clonedDetailMap = new Map(clonedModel[this.definitionMapName]);

        clonedDetailMap.forEach((value: T, key: string) => {
            let entity = this.getNew();
            entity = value;
            this.detailMap.set(key, entity);
        });
        if (state === HvlFormConstants.COPY)
            this.selectedLanguage = this.configurationService.config.theme.language.system.code;
        this.mlForm.patchValue(clonedDetailMap.get(this.selectedLanguage));
    }

    //kovan
    /**
     *
     * @param form
     *
     */
    setDetailMapToForm(form: UntypedFormGroup) {
        const detailMapObject = {
            form: form,
            mlForm: this.mlForm,
            selectedLanguage: this.selectedLanguage,
            detailMap: this.detailMap,
            systemLanguages: this.configurationService.config.theme.language.supportedLanguages,
        };
        detailMapObject.form.value[this.definitionMapName] = new Map<string, T>();

        let entity = this.getNew();
        entity = detailMapObject.mlForm.value;
        detailMapObject.detailMap.set(detailMapObject.selectedLanguage, entity);

        detailMapObject.systemLanguages.forEach((value) => {
            if (value.code == detailMapObject.selectedLanguage) {
                detailMapObject.form.value[this.definitionMapName].set(detailMapObject.selectedLanguage, {
                    ...detailMapObject.mlForm.value,
                });
            } else {
                const tempMap = detailMapObject.detailMap.get(value.code);
                // bazı ekranlarda detailMapObject.detailMap kısmında ikinci değer oluşmadığı için kırılıyordu
                // alt satırdaki if bu hatanın oluşmasını engelliyor
                if (tempMap) {
                    // T Model icinde localizedId objesi dikkate alinmadi
                    let control = false;
                    Object.keys(tempMap).map((key) => {
                        if (key !== 'localizedId') {
                            if (tempMap[key] !== null && tempMap[key].trim() !== '') control = true;
                        }
                    });
                    if (control) {
                        detailMapObject.form.value[this.definitionMapName].set(value.code, {
                            ...tempMap,
                        });
                    }
                }
            }
        });
    }

    /**
     * This function is used to set detailMap object to mlForm when hvlMl dropdown is changed.
     * @param selectedDefinitionLang
     */
    setMlFormWhenLangChange(selectedDefinitionLang: string) {
        this.mlForm.patchValue(this.detailMap.get(selectedDefinitionLang));
    }

    //kovan
    onDefinitionChange() {
        let entity = this.getNew();
        entity = this.mlForm.value;
        this.detailMap.set(this.selectedLanguage, entity);
    }

    //kovan
    resetMlForm() {
        this.mlForm.reset();
    }
}
