import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DistrictPageComponent} from "./component/district-page.component";


const routes: Routes = [{path: '', component: DistrictPageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DistrictRoutingModule {
}
