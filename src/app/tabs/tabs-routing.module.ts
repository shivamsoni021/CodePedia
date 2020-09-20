import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tab-nav',
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
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
         
      },
      {
        path: '',
        redirectTo: '/tabs/tab-nav/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-nav/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
