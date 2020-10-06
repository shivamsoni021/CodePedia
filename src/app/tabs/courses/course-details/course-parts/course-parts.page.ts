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
  partNumber:number=0;
  currentPart;
  showContent=true;
  fromBack= false;
  slideOpts = {
    slidesPerView: 2,
};
  constructor(private router: Router) { }

  ngOnInit() {
    this.courseDetails = window.history.state.courseDetails;
    this.courseType = window.history.state.courseType;
    this.courseId = window.history.state.id;
    
    console.log(this.partNumber);
    this.getAllParts();
  }

  ionViewWillEnter(){
    this.showContent=false;
    this.partNumber= window.history.state.partNumber-1;
    console.log(this.partNumber);
    if(this.partNumber>0){
      this.passCurrentPart();
    }
    else{
      this.showContent = true;
    }
  }

  getAllParts(){
    console.log("Called");
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
  
  passCurrentPart(){
      this.currentPart= this.courseParts[this.partNumber];
      console.log(this.currentPart);
      this.navigateToSectionPage(this.currentPart,`part${this.partNumber + 1}`);
    }

  navigateToSectionPage(currentPart:Parts ,id: string){
    let courseType = this.courseType;
    let courseId = this.courseId;
    console.log(currentPart);
    console.log(id);
    let parts = id.split("t");
    let partNumber = parts[1];
    this.router.navigate(["tabs/courses/course-details/course-parts/course-section"],{
      state:{
          currentPart,
          courseType,
          id,
          courseId,
          partNumber
        }
    });
  }
}
