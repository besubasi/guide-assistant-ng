import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityCompanyPageComponent} from "./component/activity-company-page.component";


const routes: Routes = [{path: '', component: ActivityCompanyPageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ActivityCompanyRoutingModule {
}
