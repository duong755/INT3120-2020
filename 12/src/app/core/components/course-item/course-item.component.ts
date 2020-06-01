import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input()
  displayName: string;

  @Input()
  organization: string;

  @Input()
  location: string;

  @Input()
  topic: string;

  @Input()
  rate: number;

  @Input()
  numberOfRate: number;

  constructor() {}

  ngOnInit() {}
}
