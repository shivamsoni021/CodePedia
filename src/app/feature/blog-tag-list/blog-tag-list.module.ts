import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogTagListPageRoutingModule } from './blog-tag-list-routing.module';

import { BlogTagListPage } from './blog-tag-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogTagListPageRoutingModule
  ],
  declarations: [BlogTagListPage]
})
export class BlogTagListPageModule {}
