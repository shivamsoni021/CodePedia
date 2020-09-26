import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';
import { DatabaseService, CourseData } from '../../database/database.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  allTechnology: HomeTechnology[] = new Array();
  coursesData: any;
  obsData: any;
  slideOpts = {
    slidesPerView: 2,
  }
  selectData: string;
  constructor(private databaseService: DatabaseService,
    private router: Router) { }

  ngOnInit() {
    
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }

  ionViewWillEnter() {
    this.getAllCourses();
  }

  getAllCourses() {
    this.databaseService.getAllCourses().subscribe((allCourses: HomeTechnology) => {
      for (const courses in allCourses) {
        this.allTechnology.push(allCourses[courses]);
        console.log(allCourses[courses]);
      }
      console.log(this.allTechnology.length)
    })
  }

  public test(event , item){
    this.selectData =item; 
  }

  navigateToCoursePage(courseDetails: HomeTechnology): void {
    this.router.navigate(["tabs/courses/course-details"], {
        state: {
            courseDetails
        }
    });
}

}
