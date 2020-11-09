import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database/database.service';
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

    /** This variable is used for storing course details */
    courseDetails: any;
    /** This variable is used for storing course type */
    courseType: string;
    /** This variable is used for storing userId of current user */
    userId: string;
    /** This variable is used for storing course studying ids */
    courseStudying = [];
    /** This variable is used for storing selected course id */
    selectedCourseId: number;
    /** This variable is used for checking whether course is enrolled or not */
    isCourseEnrolled = false;

    /** @ignore */
    constructor(
        private authService: AuthService,
        private databaseService: DatabaseService,
        private router: Router,
        private loadingService: LoadingService,
        private homeService: HomeDatabase,
        private toastService: ToastService
    ) { }

    ngOnInit() {
        this.courseType = window.history.state.courseType;
    }

    async ionViewWillEnter() {
        this.userId = this.authService.getUserId();
        this.selectedCourseId = window.history.state.courseId;
        this.authService.getUserData(this.userId).subscribe((res: any) => {
            console.log(res);
            // tslint:disable-next-line: forin
            for (const course in res.courseStudying) {
                this.courseStudying.push(res.courseStudying[course].courseId);
            }
            this.isCourseEnrolled = this.courseStudying.includes(this.selectedCourseId);
        });
        this.getCourseDetails();

    }

    /**
     * This method is used for getting course details
     */
    getCourseDetails() {
        this.homeService.getCourseDetails(this.selectedCourseId).subscribe(res => {
            // tslint:disable-next-line: forin
            for (const course in res) {
                this.courseDetails = res[course];
            }
            console.log(this.isCourseEnrolled);
            if (this.isCourseEnrolled) {
                this.navigateToCoursePartsPage(this.courseDetails.courseIndex, this.courseDetails.courseName, this.courseDetails.imageUrl);
            }
        });
    }


    /**
     * This method is used for enrolling selected course
     */
    enrollCourse() {
        this.databaseService.enrollCourse(this.userId, this.selectedCourseId).subscribe((resData: any) => {
            this.toastService.showToast('Course enrolled successfully', 'success');
        });
        this.navigateToCoursePartsPage(this.courseDetails.courseIndex, this.courseDetails.courseName, this.courseDetails.imageUrl);
    }

    /**
     * This method is used for navigating to course parts page
     * @param courseDetails selected course details
     * @param courseName selected course name
     * @param image selected course title image
     */
    navigateToCoursePartsPage(courseDetails: any, courseName: string, image: string): void {
        this.loadingService.hideLoader();
        const id = this.selectedCourseId;
        if (this.router.url.includes('tabs/home')) {
            this.router.navigate(['tabs/home/course-details/course-parts'], {
                state: {
                    courseDetails,
                    id,
                    courseName,
                    image
                }
            });
        } else if (this.router.url.includes('tabs/courses')) {
            this.router.navigate(['tabs/courses/course-details/course-parts'], {
                state: {
                    courseDetails,
                    id,
                    courseName,
                    image
                }
            });
        }
    }

}
