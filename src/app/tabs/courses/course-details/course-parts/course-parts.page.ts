import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-parts',
  templateUrl: './course-parts.page.html',
  styleUrls: ['./course-parts.page.scss'],
})
export class CoursePartsPage implements OnInit {

  courseParts;
  constructor() { }

  ngOnInit() {
    this.courseParts = window.history.state.courseDetails;
    console.log(this.courseParts);
  }

}
