import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TourTypePageComponent} from "./component/tour-type-page.component";


const routes: Routes = [{path: '', component: TourTypePageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TourTypeRoutingModule {
}
