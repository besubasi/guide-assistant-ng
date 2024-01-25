import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ApiGeneratorPageComponent} from "./component/api-generator-page.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'generate-api', component: ApiGeneratorPageComponent}
    ])],
    exports: [RouterModule]
})
export class ApiGeneratorRoutingModule {
}
