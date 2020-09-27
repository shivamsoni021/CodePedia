import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseSectionPage } from './course-section.page';

const routes: Routes = [
  {
    path: '',
    component: CourseSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseSectionPageRoutingModule {}
