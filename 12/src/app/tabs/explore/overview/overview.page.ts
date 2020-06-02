import { Component, OnInit, OnDestroy } from '@angular/core';
import { TopicService } from '../../../core/services/firebase/firestore/topic.service';
import { Course, CourseService } from '../../../core/services/firebase/firestore/course.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface Topic {
  id: string;
  name: string;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss']
})
export class OverviewPage implements OnInit, OnDestroy {
  topics: Topic[] = [];
  topicsSubscription: Subscription;

  popularCourses: Course[] = [];
  popularCoursesSubscription: Subscription;

  topRatedCourses: Course[] = [];
  topRatedCoursesSubscription: Subscription;

  constructor(public topicService: TopicService, public courseService: CourseService) {}

  ngOnInit() {
    this.getAllTopics();
    this.getPopularCourses();
    this.getTopRatedCourses();
  }

  ngOnDestroy() {
    this.topicsSubscription?.unsubscribe();
    this.popularCoursesSubscription?.unsubscribe();
    this.topRatedCoursesSubscription?.unsubscribe();
  }

  getAllTopics() {
    this.topicsSubscription = this.topicService
      .allTopics()
      .get()
      .pipe(
        map((topics) => {
          return topics.docs.map((topic) => {
            return { id: topic.id, name: topic.data().name };
          });
        })
      )
      .subscribe((topics) => {
        this.topics = topics.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      });
  }

  getPopularCourses() {
    this.popularCoursesSubscription = this.courseService
      .somePopularCourses(3)
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

  getTopRatedCourses() {
    this.topRatedCoursesSubscription = this.courseService
      .someTopRatedCourses(3)
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
