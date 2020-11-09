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

@Component({
    selector: 'app-courses',
    templateUrl: './courses.page.html',
    styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

    userId: string;
    courseType: string;
    courseProgress: string;
    isStudying = false;
    enrolledCourses: { name: string, description: string, image: string }[] = new Array();
    allTechnology: HomeTechnology[] = new Array();
    trendingTechnology: HomeTechnology[] = new Array();
    scripting: HomeTechnology[] = new Array();
    webtechnology: HomeTechnology[] = new Array();
    allTechnologySliderConfig: SliderConfiguration;
    trendingTechSliderConfig: SliderConfiguration;
    webSliderConfig: SliderConfiguration;
    scriptingSliderConfig: SliderConfiguration;
    coursePreference = "all-courses";


    sliderOptions = {
        slidesPerView: 3,
        freeMode: true,
        spaceBetween: 10
    };

    programmingCourse = [];
    webDevelopmentCourses = [];
    scriptingCourses = [];

    constructor(
        private databaseService: DatabaseService,
        private router: Router,
        private coursesFormatterService: CoursesFormatterService,
        private profileService: ProfileService,
        private homeService: HomeDatabase,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.getProgrammingCourses();
        this.getWebDevelopmentCourses();
    }

    ionViewWillEnter() {
        this.trendingTechnology = [];
        this.enrolledCourses = [];
        this.webtechnology = [];
        this.scripting = [];
      //  this.getAllCourses();
      //  this.getTrendingCourses();
        this.userId = this.authService.getUserId();
      //  this.loadEnrolledCourse();
        const preference = window.history.state.coursePreference;
        if (preference != undefined) {
            this.coursePreference = preference;
        }
    }

    // getAllCourses() {
    //     this.databaseService.getCourses('allTechnology').subscribe((allCourses: HomeTechnology) => {
    //         for (const courses in allCourses) {
    //             this.allTechnology.push(allCourses[courses]);
    //         }
    //         this.allTechnologySliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.allTechnology);
    //         console.log(this.allTechnologySliderConfig);
    //     });
    // }

    // getTrendingCourses() {
    //     this.databaseService.getCourses('trending').subscribe((trendingTechno: HomeTechnology) => {
    //         for (const courses in trendingTechno) {
    //             this.trendingTechnology.push(trendingTechno[courses]);
    //         }
    //         this.trendingTechSliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.trendingTechnology);
    //     });
    // }

    // getWebTech() {
    //     this.databaseService.getCourses('web').subscribe((webTechno: HomeTechnology) => {
    //         for (const courses in webTechno) {
    //             this.webtechnology.push(webTechno[courses]);
    //         }
    //         this.webSliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.webtechnology);
    //     });
    // }

    // getScriptTech() {
    //     this.databaseService.getCourses('scripting').subscribe((scriptTech: HomeTechnology) => {
    //         for (const courses in scriptTech) {
    //             this.scripting.push(scriptTech[courses]);
    //         }
    //         this.scriptingSliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.scripting);
    //     });
    // }

    // navigateToCoursePage(courseDetails: HomeTechnology): void {
    //     let courseType = courseDetails.courseType;
    //     this.router.navigate(['tabs/courses/course-details'], {
    //         state: {
    //             courseDetails,
    //             courseType
    //         }
    //     });
    // }
    segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
        console.log(event.detail.value);
        this.isStudying = !this.isStudying;
    }

    ionViewDidLeave() {
        this.allTechnology = [];
    }

    // loadEnrolledCourse() {
    //     let temData = [];
    //     this.profileService.getEnrolledCourse(this.userId).subscribe((resData: any) => {
    //         console.log(resData);
    //         for (const course in resData) {
    //             let progress = resData[course].progress;
    //             console.log(resData[course].courseId);
    //             this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data: any) => {
    //                 temData.push(data);
    //                 console.log(data);
    //                 if (temData.length) {
    //                     this.enrolledCourses.push({
    //                         name: data.atName, description: data.atDescription,
    //                         image: data.imageUrl
    //                     });
    //                 }
    //                 console.log(this.enrolledCourses);
    //             });
    //         }

    //     });
    //     console.log(this.enrolledCourses);
    // }

    navigateToCourseList(courseType): void {
        this.router.navigate(['tabs/courses/course-list'], {
            state: {
                courseType
            }
        });
    }


    /**
     * This method is used for navigating to selected course details
     * @param selectedCourseDetails selected course on which we want to navigate and see details
     */
    navigateToCourseDetails(selectedCourseDetails) {
        this.router.navigate(['tabs/courses/course-details'], {
            state: {
                courseId: selectedCourseDetails.courseId
            }
        });
    }

    /**
     * This method is used for getting all trending courses
     */
    getProgrammingCourses() {
        console.log('in');
        this.homeService.getCoursesByCategory('Programming Language').subscribe(programmingCourse => {
            // tslint:disable-next-line: forin
            for (const course in programmingCourse) {
                this.programmingCourse.push(programmingCourse[course]);
            }
            console.log(this.programmingCourse);
        });
    }

    /**
     * This method is used for getting all web development courses
     */
    getWebDevelopmentCourses() {
        console.log('in');
        this.homeService.getCoursesByCategory('web development').subscribe(webDevelopmentCourses => {
            // tslint:disable-next-line: forin
            for (const course in webDevelopmentCourses) {
                this.webDevelopmentCourses.push(webDevelopmentCourses[course]);
            }
            console.log(this.webDevelopmentCourses);
        });
    }

    /**
     * This method is used for getting all scripting language courses
     */
    getScriptingCourses() {
        console.log('in');
        this.homeService.getCoursesByCategory('Scripting Language').subscribe(scriptingCourses => {
            // tslint:disable-next-line: forin
            for (const course in scriptingCourses) {
                this.scriptingCourses.push(scriptingCourses[course]);
            }
            console.log(this.scriptingCourses);
        });
    }
}
