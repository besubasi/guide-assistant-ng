import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TourCategoryPageComponent} from "./component/tour-category-page.component";


const routes: Routes = [{path: '', component: TourCategoryPageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TourCategoryRoutingModule {
}
