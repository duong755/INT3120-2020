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

  somePopularCourses() {
    return this.ngFireFirestore.collection<Course>('courses', (ref) => ref.orderBy('members.count', 'desc').limit(5));
  }

  someTopRatedCourses() {
    return this.ngFireFirestore.collection<Course>('courses', (ref) =>
      ref.orderBy('rate.count', 'desc').orderBy('rate.point', 'desc').limit(5)
    );
  }
}
