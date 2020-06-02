import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseService, Course } from '../../../core/services/firebase/firestore/course.service';

@Component({
  selector: 'app-top-rated-courses',
  templateUrl: './top-rated-courses.page.html',
  styleUrls: ['./top-rated-courses.page.scss']
})
export class TopRatedCoursesPage implements OnInit {
  topRatedCourses: Course[] = [];
  topRatedCoursesSubscription: Subscription;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.topRatedCoursesSubscription = this.courseService
      .someTopRatedCourses(10)
      .get()
      .pipe(
        map((courses) => {
          return courses.docs.map((course) => {
            return { id: course.id, ...(course.data() as Course) };
          });
        })
      )
      .subscribe((courses) => {
        this.topRatedCourses = courses;
      });
  }
}
