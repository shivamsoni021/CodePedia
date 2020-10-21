import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'course-details',
        loadChildren: () => import('../courses/course-details/course-details.module').then(m => m.CourseDetailsPageModule)
    },
    {
        path: 'course-details/course-parts',
        loadChildren: () => import('../courses/course-details/course-parts/course-parts.module').then(m => m.CoursePartsPageModule)
    },
    {
        path: 'course-details/course-parts/course-section',
        loadChildren: () => import('../courses/course-details/course-parts/course-section/course-section.module')
            .then(m => m.CourseSectionPageModule)
    },
    {
        path: 'course-list',
        loadChildren: () => import('../courses/course-list/course-list.module').then(m => m.CourseListPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule { }
