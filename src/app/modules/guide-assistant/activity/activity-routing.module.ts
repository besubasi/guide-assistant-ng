import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityPageComponent} from "./component/activity-page.component";


const routes: Routes = [{path: '', component: ActivityPageComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ActivityRoutingModule {
}
