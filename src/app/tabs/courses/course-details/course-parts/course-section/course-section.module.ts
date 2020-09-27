import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseSectionPageRoutingModule } from './course-section-routing.module';

import { CourseSectionPage } from './course-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseSectionPageRoutingModule
  ],
  declarations: [CourseSectionPage]
})
export class CourseSectionPageModule {}
