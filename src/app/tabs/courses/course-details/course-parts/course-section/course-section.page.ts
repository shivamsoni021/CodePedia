import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSlides } from '@ionic/angular';
import { ContentService } from 'src/app/database/content.service';


@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.page.html',
  styleUrls: ['./course-section.page.scss'],
})

export class CourseSectionPage implements OnInit {

  isCompleted=false;
  sections;
  id;
  courseType:string;
  progress=0;
  perSection;
  isEnd;
  courseId;
  count=0;
  partNumber:number;
  content : {heading:string , imageUrl:string, data:string}[]= new Array();
  @ViewChild('slider') slides: IonSlides;
  @ViewChild(IonContent) scrollContent : IonContent;
  constructor(private contentService : ContentService,
          private _location: Location,private router : Router) { }

  ngOnInit() {
    this.sections = window.history.state.currentPart;
    this.id = window.history.state.id;
    this.courseType = window.history.state.courseType;
    this.courseId = window.history.state.courseId;
    this.partNumber = window.history.state.partNumber;
    console.log(this.partNumber);
    this.getContent();
    }

    getContent(){
        this.contentService.getContent(this.id,this.courseType,this.courseId).subscribe((resData :any)=>{
            for(const heading in resData){
              
              this.content.push({heading:heading, imageUrl:resData[heading].imageUrl 
                ,data:resData[heading].data});
            }
          });
    }

    swipeNext(){
      this.perSection = 100/this.content.length;
      console.log(this.perSection);
      this.slides.slideNext();
      this.scrollContent.scrollToTop();
      this.slides.isEnd().then(resData=>{
        this.isEnd = resData;
      });
     
      this.progress = Math.round(this.progress + this.perSection);
      if(this.progress===99){
        this.progress = 100;
      }
      
      else if(this.progress>100){
        this.progress = 100;
      }
      this.perSection = 0;
    }
    onComplete(){
      this.partNumber++;
      this.isCompleted = true;
    }

    navigateBack(){
      let partNumber:number = this.partNumber;
        this.router.navigate(['tabs/courses/course-details/course-parts'],{
          state:{
            partNumber
        }
      });
    }
}
