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
                path: 'activity-company',
                loadChildren: () => import('./activity-company/activity-company.module').then(m => m.ActivityCompanyModule)
            },
            {
                path: 'pricing-type',
                loadChildren: () => import('./pricing-type/pricing-type.module').then(m => m.PricingTypeModule)
            },
            {
                path: 'currency',
                loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule)
            },
            {
                path: 'activity',
                loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
            },
            {
                path: 'tour',
                loadChildren: () => import('./tour/tour.module').then(m => m.TourModule)
            },
            {
                path: "tour-category",
                loadChildren: () => import('./tour-category/tour-category.module').then(m => m.TourCategoryModule)
            },
            {
                path: "tour-type",
                loadChildren: () => import('./tour-type/tour-type.module').then(m => m.TourTypeModule)
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
