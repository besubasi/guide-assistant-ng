import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'country',
                loadChildren: () => import('./country/country.module').then(m => m.CountryModule)
            },
            {
                path: 'city',
                loadChildren: () => import('./city/city.module').then(m => m.CityModule)
            },
            {
                path: 'district',
                loadChildren: () => import('./district/district.module').then(m => m.DistrictModule)
            },
            {
                path: 'company',
                loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
            },
            {
                path: 'activity',
                loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
            },
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
