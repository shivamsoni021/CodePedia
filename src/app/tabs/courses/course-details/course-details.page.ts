import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database/database.service';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/auth/auth.service';
import { HomeDatabase } from '../../home/services/homedb.service';
interface CourseData {
    courseId: string[];
}
@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.page.html',
    styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

    courseDetails: any;
    courseType: string;
    requirements: string[] = new Array();
    benefits: string[] = new Array();
    wlearn: string[] = new Array();
    description: string[] = new Array();
    imageUrl: string;
    userId: string;
    id: string;
    courseName: string;
    courseStudying: CourseData[] = new Array();


    selectedCourseId: number;
    constructor(
        private authService: AuthService,
        private databaseService: DatabaseService,
        private router: Router,
        private loadingService: LoadingService,
        private homeService: HomeDatabase,
        private toastService: ToastService
    ) { }

    ngOnInit() {


        // this.courseDetails = window.history.state.courseDetails;
        this.courseType = window.history.state.courseType;
        console.log(this.courseType);
        this.userId = this.authService.getUserId();
        // this.id = this.courseDetails.id;
        // this.databaseService.isStudying(this.userId).subscribe((resData: any) => {
        //     // tslint:disable-next-line: forin
        //     for (const course in resData) {
        //         this.courseStudying.push(resData[course]);
        //     }
        //     console.log(this.courseStudying);
        //     this.courseStudying.forEach((value: any) => {
        //         this.isStudying(value);
        //     });
        //     this.loadingService.hideLoader();
        // });


        //  this.setAllValues();
    }

    ionViewWillEnter() {
        this.selectedCourseId = window.history.state.courseId;
        this.getCourseDetails();
    }

    getCourseDetails() {
        console.log(this.selectedCourseId)
        this.homeService.getCourseDetails(this.selectedCourseId).subscribe(res => {
            console.log(res);
            const d: any = [];
            // tslint:disable-next-line: forin
            for (const course in res) {
                this.courseDetails = res[course];
            }
        });
    }

    setAllValues() {
        // this.imageUrl = this.courseDetails.imageSrc;
        // this.courseName = this.courseDetails.name;
        // this.description = this.courseDetails.description.split('TOSPLIT');
        // this.requirements = this.courseDetails.requirement.split('TOSPLIT');
        // this.benefits = this.courseDetails.benefits.split('TOSPLIT');
        // this.wlearn = this.courseDetails.wlearn.split('TOSPLIT');
        // this.id = this.courseDetails.id;

    }

    /**
     * This method is used for enrolling selected course
     */
    enrollCourse() {
        this.databaseService.enrollCourse(this.userId, this.selectedCourseId).subscribe((resData: any) => {
            this.toastService.showToast('Course enrolled successfully', 'success');
        });
        this.navigateToCoursePage(this.courseDetails.parts, this.courseName, this.imageUrl);
    }

    // isStudying(value: any): boolean {

    //     if (value.courseId === this.id) {
    //         console.log(value.courseId);
    //         this.navigateToCoursePage(this.courseDetails.parts, this.courseName, this.imageUrl);
    //     }
    //     else {
    //         return false;
    //     }

    // }

    navigateToCoursePage(courseDetails: any, courseName, image): void {
        this.loadingService.hideLoader();
        const courseType = this.courseType;
        const id = this.id;
        this.router.navigate(['tabs/courses/course-details/course-parts'], {
            state: {
                courseDetails,
                courseType,
                id,
                courseName,
                image
            }
        });
    }

}
