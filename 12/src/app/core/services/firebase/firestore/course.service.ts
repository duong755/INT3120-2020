import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Course {
  profile: {
    displayName: string;
    organization: string;
    location: string;
    topic: string;
    description: string;
    instructors: Array<{
      displayName: string;
      title: string;
    }>;
  };
  members: {
    count: number;
    map: {
      [userId: string]: boolean;
    };
  };
  rate: {
    count: number;
    point: number;
    users: {
      [userId: string]: {
        point: number;
        rateAt: number; // timestamp
        review: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private ngFireFirestore: AngularFirestore) {}

  somePopularCourses(n: number) {
    return this.ngFireFirestore.collection<Course>('courses', (ref) => ref.orderBy('members.count', 'desc').limit(n));
  }

  someTopRatedCourses(n: number) {
    return this.ngFireFirestore.collection<Course>('courses', (ref) =>
      ref.orderBy('rating.point', 'desc').orderBy('rating.count', 'desc').limit(n)
    );
  }
}
