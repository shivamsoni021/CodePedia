import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseDetailsPage } from './course-details.page';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailsPage
  },  {
    path: 'course-parts',
    loadChildren: () => import('./course-parts/course-parts.module').then( m => m.CoursePartsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseDetailsPageRoutingModule {}
