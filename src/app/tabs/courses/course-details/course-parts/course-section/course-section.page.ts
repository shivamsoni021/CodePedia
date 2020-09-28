import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonSlides } from '@ionic/angular';
import { ContentService } from 'src/app/database/content.service';


@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.page.html',
  styleUrls: ['./course-section.page.scss'],
})

export class CourseSectionPage implements OnInit {

  sections;
  id;
  progress=0;
  perSection;
  isEnd;
  content : {heading:string , imageUrl:string, data:string}[]= new Array();
  @ViewChild('slider') slides: IonSlides;
  @ViewChild(IonContent) scrollContent : IonContent;
  constructor(private contentService : ContentService) { }

  ngOnInit() {
    this.sections = window.history.state.currentPart;
    this.id = window.history.state.id;
    
    this.getContent();
    }

    getContent(){
        this.contentService.getContent(this.id).subscribe((resData :any)=>{
            for(const heading in resData){
              
              this.content.push({heading:heading, imageUrl:resData[heading].imageUrl 
                ,data:resData[heading].data});
            }
          })
    
      
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
    navigateToCourse(){

    }
}
