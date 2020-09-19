import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'blogs',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
    },
    {
        path: 'blogs',
        loadChildren: () => import('./feature/blogs/blogs.module').then(m => m.BlogsPageModule)
    },
    {
        path: 'blog-details',
        loadChildren: () => import('./feature/blog-details/blog-details.module').then(m => m.BlogDetailsPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
