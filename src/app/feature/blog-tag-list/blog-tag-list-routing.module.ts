import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogTagListPage } from './blog-tag-list.page';

const routes: Routes = [
  {
    path: '',
    component: BlogTagListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogTagListPageRoutingModule {}
