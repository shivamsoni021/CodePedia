import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPage } from './courses.page';

const routes: Routes = [
  {
    path: '',
    component: CoursesPage
  },
  {
    path: 'course-details',
    loadChildren: () => import('./course-details/course-details.module').then( m => m.CourseDetailsPageModule)
  },
  {
    path: 'course-details/course-parts',
    loadChildren: () => import('./course-details/course-parts/course-parts.module').then( m => m.CoursePartsPageModule)
  },
  {
    path: 'course-details/course-parts/course-section',
    loadChildren:() => import('./course-details/course-parts/course-section/course-section.module')
    .then(m=>m.CourseSectionPageModule)
  },  {
    path: 'course-list',
    loadChildren: () => import('./course-list/course-list.module').then( m => m.CourseListPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesPageRoutingModule {}
