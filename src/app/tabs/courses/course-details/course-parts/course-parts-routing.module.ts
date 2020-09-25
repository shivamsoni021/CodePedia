import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursePartsPage } from './course-parts.page';

const routes: Routes = [
  {
    path: '',
    component: CoursePartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursePartsPageRoutingModule {}
