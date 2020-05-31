import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/core/services/firebase/firestore/topic.service';
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
export class OverviewPage implements OnInit {
  topics: Topic[];

  constructor(public topicService: TopicService) {}

  ngOnInit() {
    this.topicService
      .allTopics()
      .snapshotChanges()
      .pipe(
        map((topics) => {
          return topics.map((topic) => ({ id: topic.payload.doc.id, name: topic.payload.doc.data().name }));
        })
      )
      .subscribe((topics) => {
        this.topics = topics.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      });
  }
}
