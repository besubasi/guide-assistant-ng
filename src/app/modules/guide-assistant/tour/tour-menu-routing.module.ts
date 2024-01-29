import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'tour',
                loadChildren: () => import('./tour/tour.module').then(m => m.TourModule)
            },
            {
                path: "tour-category",
                loadChildren: () => import('./tourcategory/tour-category.module').then(m => m.TourCategoryModule)
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TourMenuRoutingModule {
}
