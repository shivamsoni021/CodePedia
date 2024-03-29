import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from '../../database/database.service';
import { HomeFormatterService } from './services/home-formatter.service';
import { SliderConfiguration } from 'src/app/components/slider/constants/slider.constant';
import { ProfileService } from '../profile/services/profile.service';
import { HomeDatabase } from './services/homedb.service';
import { Router } from '@angular/router';

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
    isStudying=true;
    enrolledCourses: SliderConfiguration;
    suggestedCourses: SliderConfiguration;
    coursePreference:string = "";
    constructor(
        private authService: AuthService,
        private homeFormatterService: HomeFormatterService,
        private profileService: ProfileService,
        private homeService : HomeDatabase,
        private router : Router,
        private databaseService : DatabaseService
    ) { }

    ngOnInit() {  
        this.userId = this.authService.getUserId();
        this.loadEnrolledCourse();
        this.databaseService.getCompletedCourses(this.userId);
        this.loadSuggestedCourse();   
         }

    loadEnrolledCourse(){
        let temData = [];
        this.profileService.getEnrolledCourse(this.userId).subscribe((resData:any)=>{
            for(const course in resData){
                this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data:any)=>{
                    temData.push(data);
                    if(temData.length) {
                        this.enrolledCourses = this.homeFormatterService.getFormattedTechnologyData(temData);
                    }
                
                });
            }
        });
 
        if(this.enrolledCourses == undefined){
            this.isStudying = false;
        }
    }

    loadSuggestedCourse(){
        let temData = [];
        this.homeService.loadSuggestedCourse().subscribe((resData:any)=>{
            for(const course in resData){
                this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data:any)=>{
                    temData.push(data);
                    console.log(temData);
                    if(temData.length){
                        this.suggestedCourses = this.homeFormatterService.getFormattedTechnologyData(temData);
                        console.log(this.suggestedCourses);
                    }
               });
            }
        });
    }
  
    navigateToCoursePage(courseDetails) {
        let courseType = courseDetails.courseType;
        this.router.navigate(['tabs/courses/course-details'], {
            state: {
                courseDetails,
                courseType
            }
        });    
    }

    navigation(preference){
        if(preference == "all-courses"){
            this.coursePreference = "all-courses";
        }
        else{
            this.coursePreference = "studying";
        }
        let coursePreference = preference;
        this.router.navigate(['tabs/courses'], {
            state: {
                coursePreference
            }
        });
    }

}
