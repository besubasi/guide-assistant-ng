import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryPageComponent} from "./component/country-page.component";


const routes: Routes = [{path: '', component: CountryPageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CountryRoutingModule {
}
