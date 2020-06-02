import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseService, Course } from '../../../core/services/firebase/firestore/course.service';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.page.html',
  styleUrls: ['./popular-courses.page.scss']
})
export class PopularCoursesPage implements OnInit {
  popularCourses: Course[] = [];
  popularCoursesSubscription: Subscription;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.popularCoursesSubscription = this.courseService
      .somePopularCourses(10)
      .get()
      .pipe(
        map((courses) => {
          return courses.docs.map((course) => {
            return { id: course.id, ...(course.data() as Course) };
          });
        })
      )
      .subscribe((courses) => {
        this.popularCourses = courses;
      });
  }
}
