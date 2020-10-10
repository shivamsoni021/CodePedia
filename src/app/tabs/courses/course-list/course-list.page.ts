import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database/database.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {

  courseType:string;
  courses:{name :string ,description:string , benefits:string, imageSrc:string , wlearn:string,
          requirement:string,id:string,parts}[]=new Array();
  constructor(private databaseService: DatabaseService,
      private router:Router) { }
  ngOnInit() {
    
  }
  
  ionViewWillEnter(){
    this.courseType = window.history.state.courseType;
    this.courses = [];
    this.getContent();
  }
  getContent(){
    
    this.databaseService.getCourses(this.courseType).subscribe((courses: any) => {
      // tslint:disable-next-line: forin
      for (const course in courses) {
          let temp = courses[course];
          this.courses.push({name: temp.atName, description: temp.atDescription,
            benefits:temp.benefits, imageSrc: temp.imageUrl,
            wlearn:temp.wlearn , requirement:temp.requirement,
            id:temp.id,parts: temp.parts});
      }
    console.log(this.courses);
  });
  }

  navigateToCoursePage(courseDetails): void {
    let courseType = this.courseType;
    this.router.navigate(['tabs/courses/course-details'], {
        state: {
            courseDetails,
            courseType
        }
    });
}
}
