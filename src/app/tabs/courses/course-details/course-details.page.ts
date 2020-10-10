import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database/database.service';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/auth/auth.service';
interface CourseData {
    courseId: string[];
}
@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.page.html',
    styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

    courseDetails: HomeTechnology;
    courseType:string;
    requirements: string[] = new Array();
    benefits: string[] = new Array();
    wlearn: string[] = new Array();
    description: string[] = new Array();
    imageUrl: string;
    userId: string;
    id: string;
    courseStudying: CourseData[] = new Array();

    constructor(
        private authService: AuthService,
        private databaseService: DatabaseService,
        private router: Router,
        private loadingService: LoadingService
    ) { }

    ngOnInit() {

        this.courseDetails = window.history.state.courseDetails;
        this.courseType = window.history.state.courseType;
        console.log(this.courseType);
        this.userId = this.authService.getUserId();
        this.id = this.courseDetails.id;
        this.databaseService.isStudying(this.userId).subscribe((resData: any) => {
            // tslint:disable-next-line: forin
            for (const course in resData) {
                this.courseStudying.push(resData[course]);
            }
            console.log(this.courseStudying);
            this.courseStudying.forEach((value: any) => {
                this.isStudying(value);
            });
            this.loadingService.hideLoader();
        });

        this.setAllValues();
    }

    setAllValues() {
        this.imageUrl = this.courseDetails.imageSrc;
        this.description = this.courseDetails.description.split('TOSPLIT');
        this.requirements = this.courseDetails.requirement.split('TOSPLIT');
        this.benefits = this.courseDetails.benefits.split('TOSPLIT');
        this.wlearn = this.courseDetails.wlearn.split('TOSPLIT');
        this.id = this.courseDetails.id;

    }

    enrollCourse() {

        this.databaseService.enrollCourse(this.userId, this.id).subscribe((resData: any) => {
            console.log(resData);
        });
        this.navigateToCoursePage(this.courseDetails.parts); 
    }

    isStudying(value: any): boolean {

        if (value.courseId === this.id) {
            console.log(value.courseId);
            this.navigateToCoursePage(this.courseDetails.parts);
        }
        else {
            return false;
        }

    }

    navigateToCoursePage(courseDetails: any): void {
        this.loadingService.hideLoader();
        let courseType = this.courseType;
        let id = this.id;
        this.router.navigate(['tabs/courses/course-details/course-parts'], {
            state: {
                courseDetails,
                courseType,
                id
            }
        });
    }

}
