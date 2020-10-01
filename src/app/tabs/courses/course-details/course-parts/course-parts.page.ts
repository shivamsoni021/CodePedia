import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Parts{
  id: string;
  partName: string;
  partDescription: string;
  partsPoint: string[];
}
@Component({
  selector: 'app-course-parts',
  templateUrl: './course-parts.page.html',
  styleUrls: ['./course-parts.page.scss'],
})
export class CoursePartsPage implements OnInit {

  courseDetails;
  courseParts: Parts[] = new Array();
  partId;
  courseId;
  courseType:string;
  slideOpts = {
    slidesPerView: 2,
};
  constructor(private router: Router) { }

  ngOnInit() {
    this.courseDetails = window.history.state.courseDetails;
    this.courseType = window.history.state.courseType;
    this.courseId = window.history.state.id;
    this.getAllParts();
  }

  getAllParts(){
    for(const parts in this.courseDetails){
      let partsPoint:string[]=new Array();
      for(const points in this.courseDetails[parts].partsPoints){
        partsPoint.push(this.courseDetails[parts].partsPoints[points]);
      }      
      this.courseParts.push({id :this.courseDetails[parts].id,partName :this.courseDetails[parts].partName ,
         partDescription: this.courseDetails[parts].partDescription , 
        partsPoint:partsPoint});
      console.log(this.courseParts);
    }
  }
  
  navigateToSectionPage(currentPart:Parts ,id: string){
    let courseType = this.courseType;
    let courseId = this.courseId;
    this.router.navigate(["tabs/courses/course-details/course-parts/course-section"],{
      state:{
          currentPart,
          courseType,
          id,
          courseId
        }
    });
  }
}
