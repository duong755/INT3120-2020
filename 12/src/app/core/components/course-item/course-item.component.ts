import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input('displayName')
  displayName: string;

  @Input('organization')
  organization: string;

  @Input('location')
  location: string;

  @Input('topic')
  topic: string;

  @Input('rate')
  rate: number | null;

  @Input()
  numberOfRate: number | null;

  constructor() {}

  ngOnInit() {}
}
