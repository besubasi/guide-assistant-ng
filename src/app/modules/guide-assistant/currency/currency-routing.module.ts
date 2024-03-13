import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CurrencyPageComponent} from "./component/currency-page.component";


const routes: Routes = [{path: '', component: CurrencyPageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CurrencyRoutingModule {
}
