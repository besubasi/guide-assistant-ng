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
            {
                path: "tour-type",
                loadChildren: () => import('./tourtype/tour-type.module').then(m => m.TourTypeModule)
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
