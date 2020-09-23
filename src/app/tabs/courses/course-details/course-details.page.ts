import { Component, OnInit } from '@angular/core';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  courseDetails: HomeTechnology;
  constructor() { }

  ngOnInit() {
    this.courseDetails = window.history.state.courseDetails;
    console.log(this.courseDetails);  
  }

}
