import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: 'apigen',
                        loadChildren: () => import('./modules/api-generator/api-generator.module').then(m => m.ApiGeneratorModule)
                    },
                    {
                        path: 'account',
                        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
                    },
                    {
                        path: 'guide-assistant',
                        loadChildren: () => import('./modules/guide-assistant/guide-assistant.module').then(m => m.GuideAssistantModule)
                    },
                    {
                        path: 'guide-assistant/tour-menu/tour-category',
                        loadChildren: () => import('./modules/guide-assistant/tour/tour-category/tour-category-routing.module').then(m => m.TourCategoryRoutingModule)
                    },
                    {
                        path: 'guide-assistant/tour-menu/tour-type',
                        loadChildren: () => import('./modules/guide-assistant/tour/tour-type/tour-type-routing.module').then(m => m.TourTypeRoutingModule)
                    },
                    {
                        path: 'guide-assistant/tour-menu/tour',
                        loadChildren: () => import('./modules/guide-assistant/tour/tour/tour-routing.module').then(m => m.TourRoutingModule)
                    },
                    {
                        path: 'uikit',
                        loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule)
                    },
                    {
                        path: 'utilities',
                        loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule)
                    },
                    {
                        path: 'documentation',
                        loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule)
                    },
                    {
                        path: 'blocks',
                        loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule)
                    },
                    {
                        path: 'pages',
                        loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule)
                    }
                ]
            },
            {path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)},
            {
                path: 'landing',
                loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)
            },
            {path: 'notfound', component: NotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
