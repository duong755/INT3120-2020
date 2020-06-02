import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private ngFireFirestore: AngularFirestore) {}

  allTopics() {
    return this.ngFireFirestore.collection<{ name: string }>('topics');
  }
}
