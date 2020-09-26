import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Parts{
  partName:string;
  partDescription:string;
  partsPoint:string[];
}
@Component({
  selector: 'app-course-parts',
  templateUrl: './course-parts.page.html',
  styleUrls: ['./course-parts.page.scss'],
})
export class CoursePartsPage implements OnInit {

  courseDetails;
  courseParts:Parts[] = new Array();
  constructor(private router : Router) { }

  ngOnInit() {
    this.courseDetails = window.history.state.courseDetails;
    this.getAllParts();
  }

  getAllParts(){
    
    for(const parts in this.courseDetails){
      let partsPoint:string[]=new Array();
      for(const points in this.courseDetails[parts].partsPoints){
        partsPoint.push(this.courseDetails[parts].partsPoints[points]);
      }
      
      this.courseParts.push({partName :this.courseDetails[parts].partName ,
         partDescription: this.courseDetails[parts].partDescription , 
        partsPoint:partsPoint});
      console.log(this.courseParts);

      
    }
  }
  
  navigateToSectionPage(currentPart:Parts){

    this.router.navigate(["tabs/courses/course-details/course-parts"],{
      state:{
          currentPart
      }
    });
  }
}
