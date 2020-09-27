import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/database/content.service';


@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.page.html',
  styleUrls: ['./course-section.page.scss'],
})

export class CourseSectionPage implements OnInit {

  sections;
  id;
  content : {heading:string , data:string}[]= new Array();
  constructor(private contentService : ContentService) { }

  ngOnInit() {
    this.sections = window.history.state.currentPart;
    this.id = window.history.state.id;
    this.getContent(); 
  
    }

    getContent(){
        this.contentService.getContent(this.id).subscribe((resData :any)=>{
            for(const heading in resData){
              
              this.content.push({heading:heading ,data:resData[heading]});
            }
         
        })
    }
}
