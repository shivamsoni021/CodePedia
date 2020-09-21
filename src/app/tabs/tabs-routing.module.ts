import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'courses',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./courses/courses.module').then(m => m.CoursesPageModule)
                    }
                ]

            },
            {
                path: 'blogs',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsPageModule)
                    }
                ]

            },

            {
                path: 'blogs/blog-details',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../feature/blog-details/blog-details.module').then(m => m.BlogDetailsPageModule)
                    }
                ]

            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
                    },
                    {
                        path: 'settings',
                        loadChildren: () => import('./profile/settings/settings.module').then( m => m.SettingsPageModule)
                    },
                ]

            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule { }
