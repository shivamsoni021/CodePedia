import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database/database.service';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';
import { AuthService } from 'src/auth/auth.service';
interface CourseData{
  courseId:string[];
}
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  courseDetails: HomeTechnology;
  requirements : string[]= new Array();
  benefits :string[]=new Array();
  wlearn: string[]=new Array();
  description: string[]=new Array();
  imageUrl: string;
  userId:string;
  id:string;
  courseStudying:CourseData[]= new Array();

  constructor(private authService: AuthService,
    private databaseService: DatabaseService) { }

  ngOnInit() {
    this.courseDetails = window.history.state.courseDetails;
    this.userId = this.authService.getUserId();
    this.setAllValues();
    this.databaseService.isStudying(this.userId).subscribe((resData:any)=>{
      for(const course in resData){
        this.courseStudying.push(resData[course]);
        
      }  
      this.courseStudying.forEach(function (value) {
        console.log(value);
      }); 
  });
    this.isStudying();
  }

  setAllValues(){
    this.imageUrl = this.courseDetails.imageUrl;
    this.description = this.courseDetails.atDescription.split("TOSPLIT");
    this.requirements = this.courseDetails.requirement.split("TOSPLIT");
    this.benefits = this.courseDetails.benefits.split("TOSPLIT");
    this.wlearn = this.courseDetails.wlearn.split("TOSPLIT");
    this.id = this.courseDetails.id;
  }

  enrollCourse(){
    
  this.databaseService.enrollCourse(this.userId,this.id).subscribe((resData:any)=>{
    console.log(resData);
  });
  }

  isStudying(){
    console.log("ss");
    
    
  }
}
