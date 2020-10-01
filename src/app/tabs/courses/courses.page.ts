import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';
import { DatabaseService } from '../../database/database.service';
import { CoursesFormatterService } from './services/courses-formatter.service';
import { SliderConfiguration } from 'src/app/components/slider/constants/slider.constant';
import { ProfileService } from '../profile/services/profile.service';
import { HomeDatabase } from '../home/services/homedb.service';
import { AuthService } from 'src/auth/auth.service';
import { HomeFormatterService } from '../home/services/home-formatter.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.page.html',
    styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

    allTechnology: HomeTechnology[] = new Array();
    coursesData: any;
    obsData: any;
    courseType:string;
    selectData: string;
    allTechnologySliderConfig: SliderConfiguration;
    trendingTechnology:HomeTechnology[] =new Array();
    trendingTechSliderConfig: SliderConfiguration;
    scripting:HomeTechnology[]=new Array();
    scriptingSliderConfig:SliderConfiguration;
    webtechnology:HomeTechnology[]=new Array();
    webSliderConfig:SliderConfiguration;
    userId;
    enrolledCourses=new Array();
    isStudying=false;
    constructor(
        private databaseService: DatabaseService,
        private router: Router,
        private coursesFormatterService: CoursesFormatterService,
        private profileService: ProfileService,
        private homeService: HomeDatabase,
        private authService: AuthService,
        private homeFormatterService: HomeFormatterService
    ) { }

    ngOnInit() {
        
    }

    ionViewWillEnter() {
        this.getAllCourses();
        this.getTrendingCourses();
        this.userId = this.authService.getUserId();
        this.loadEnrolledCourse();
    }

    getAllCourses() {
        this.databaseService.getAllCourses().subscribe((allCourses: HomeTechnology) => {
            // tslint:disable-next-line: forin
            for (const courses in allCourses) {
                this.allTechnology.push(allCourses[courses]);
            }
            this.allTechnologySliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.allTechnology);
        });
    }

    getTrendingCourses(){
        this.databaseService.getTrendingTechnology().subscribe((trendingTechno:HomeTechnology)=>{
            for(const courses in trendingTechno){
                this.trendingTechnology.push(trendingTechno[courses]);
            }
            this.trendingTechSliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.trendingTechnology);
        });
    }

    getWebTech(){
        this.databaseService.getTrendingTechnology().subscribe((webTechno:HomeTechnology)=>{
            for(const courses in webTechno){
                this.webtechnology.push(webTechno[courses]);
            }
            this.webSliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.webtechnology);
        });
    }

    getScriptTech(){
        this.databaseService.getTrendingTechnology().subscribe((scriptTech:HomeTechnology)=>{
            for(const courses in scriptTech){
                this.scripting.push(scriptTech[courses]);
            }
            this.scriptingSliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.scripting);
        });
    }

    public test(event, item) {
        this.selectData = item;
    }

    navigateToCoursePage(courseDetails: HomeTechnology,courseType:string): void {
        this.router.navigate(['tabs/courses/course-details'], {
            state: {
                courseDetails,
                courseType
            }
        });
    }
    segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
        console.log(event.detail);
        this.isStudying = !this.isStudying;        
     }

    ionViewDidLeave() {
        this.allTechnology = [];
    }

    loadEnrolledCourse(){
        let temData = [];
        this.profileService.getEnrolledCourse(this.userId).subscribe((resData:any)=>{
            for(const course in resData){
                this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data:any)=>{
                    
                    temData.push(data);
                    if(temData.length) {
                        this.enrolledCourses.push({name: data.atName , description: data.atDescription,
                            imageSrc:data.imageUrl,parts:data.parts});
                    }
                });
            }
             
        });
        console.log(this.enrolledCourses);
}
    
    navigateToCourseList(courseType):void{
        this.router.navigate(['tabs/courses/course-list'], {
            state: {
                courseType
            }
        });
    }

}
