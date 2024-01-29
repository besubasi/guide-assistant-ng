import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'tour-menu',
                loadChildren: () => import('./tour/tour-menu.module').then(m => m.TourMenuModule)
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GuideAssistantRoutingModule {
}
