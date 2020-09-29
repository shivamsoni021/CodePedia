import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from '../../database/database.service';
import { HomeTechnology } from '../../interfaces/home-technology.interface';
import { HomeFormatterService } from './services/home-formatter.service';
import { SliderConfiguration } from 'src/app/components/slider/constants/slider.constant';
import { ProfileService } from '../profile/services/profile.service';
import { HomeDatabase } from './services/homedb.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    slideOpts = {
        slidesPerView: 2,
    };
    userId: string;
    technologyTitle = 'Shivam';
    technologies: SliderConfiguration;
    isStudying=false;
    enrolledCourses: SliderConfiguration;
    suggestedCourses:{atName:string,atDescription:string,imageUrl:string,parts}[]= new Array();
    constructor(
        private databaseService: DatabaseService,
        private authService: AuthService,
        private homeFormatterService: HomeFormatterService,
        private profileService: ProfileService,
        private homeService : HomeDatabase
    ) { }

    ngOnInit() {
       
        this.userId = this.authService.getUserId();
        
        this.loadEnrolledCourse();
        this.loadSuggestedCourse();        
      //  this.loadTechnologyData();
    }

    loadEnrolledCourse(){
        let temData = [];
        this.profileService.getEnrolledCourse(this.userId).subscribe((resData:any)=>{
            for(const course in resData){
                this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data:any)=>{
                    //  this.enrolledCourses.push({name: data.atName , description: data.atDescription,
                    //         imageSrc:data.imageUrl,parts:data.parts});
                    temData.push(data);
                    if(temData.length) {
                        this.enrolledCourses = this.homeFormatterService.getFormattedTechnologyData(temData);
                    }
                });
            }
            console.log(this.enrolledCourses); 
        });

    }
    loadSuggestedCourse(){
        this.homeService.loadSuggestedCourse().subscribe((resData:any)=>{
            for(const course in resData){
                this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data:any)=>{
                    this.suggestedCourses.push({atName: data.atName , atDescription: data.atDescription,
                           imageUrl:data.imageUrl,parts:data.parts});
               });
            }
        });
    }
    /**
     * This method is used for loading technology data and format it
     */
    loadTechnologyData() {
        const data = this.databaseService.getDataObject();
        if (data.length) {
            this.technologies = this.homeFormatterService.getFormattedTechnologyData(data);
        } else {
            setTimeout(() => { this.loadTechnologyData(); } , 2000);
        }
    }

    /**
     * This method is used for navigating to course details page
     * @param courseDetails course details
     */
    navigateToCoursePage(courseDetails) {
        console.log(courseDetails);
    }

}
