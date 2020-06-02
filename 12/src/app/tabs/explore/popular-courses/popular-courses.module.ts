import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularCoursesPageRoutingModule } from './popular-courses-routing.module';

import { CourseService } from '../../../core/services/firebase/firestore/course.service';

import { PopularCoursesPage } from './popular-courses.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PopularCoursesPageRoutingModule],
  declarations: [PopularCoursesPage],
  providers: [CourseService]
})
export class PopularCoursesPageModule {}
