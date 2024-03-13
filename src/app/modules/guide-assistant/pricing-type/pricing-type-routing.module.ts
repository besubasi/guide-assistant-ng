import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PricingTypePageComponent} from "./component/pricing-type-page.component";


const routes: Routes = [{path: '', component: PricingTypePageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PricingTypeRoutingModule {
}
