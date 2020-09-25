import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursePartsPageRoutingModule } from './course-parts-routing.module';

import { CoursePartsPage } from './course-parts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursePartsPageRoutingModule
  ],
  declarations: [CoursePartsPage]
})
export class CoursePartsPageModule {}
