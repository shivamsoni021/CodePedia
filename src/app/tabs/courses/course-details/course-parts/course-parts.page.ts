import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database/database.service';
import { HomeDatabase } from 'src/app/tabs/home/services/homedb.service';
import { AuthService } from 'src/auth/auth.service';

interface Parts {
    id: string;
    partName: string;
    partDescription: string;
    partsPoint: string[];
}
@Component({
    selector: 'app-course-parts',
    templateUrl: './course-parts.page.html',
    styleUrls: ['./course-parts.page.scss'],
})
export class CoursePartsPage implements OnInit {

    courseDetails;
    courseParts: Parts[] = new Array();
    partId;
    courseId;
    courseType: string;
    partNumber: number = 0;
    currentPart;
    showContent = true;
    fromBack = false;
    userId;
    courseName;
    courseDescription;
    courseImage;
    completedCourses;
    slideOpts = {
        slidesPerView: 2,
    };
    isCourseCompleted = false;
    wasCourseCompleted = false;
    constructor(
        private router: Router,
        private databaseService: DatabaseService,
        private authService: AuthService,
        private homeService: HomeDatabase
    ) { }

    ngOnInit() {
        this.userId = this.authService.getUserId();
        this.completedCourses = this.databaseService.returnCompletedCourse();
        this.courseDetails = window.history.state.courseDetails;
        console.log(this.courseDetails);
        this.courseName = window.history.state.courseName;
        this.courseDescription = window.history.state.description;
        this.courseImage = window.history.state.image;
        this.courseType = window.history.state.courseType;
        this.courseId = window.history.state.id;
        this.wasCourseComplete();
        console.log(this.partNumber);
        this.getAllParts();
    }

    ionViewWillEnter() {
        this.showContent = false;
        this.partNumber = window.history.state.partNumber - 1;
        console.log(this.partNumber);
        if (this.partNumber > 0) {
            this.passCurrentPart();
        }
        else {
            console.log("Course Completed")
            this.showContent = true;
        }
    }

    getAllParts() {
        console.log("Called");
        // tslint:disable-next-line: forin
        for (const parts in this.courseDetails) {
            const partsPoint: string[] = new Array();
            // tslint:disable-next-line: forin
            for (const points in this.courseDetails[parts].content) {
                console.log(points);
                console.log(this.courseDetails[parts].content);
                partsPoint.push(this.courseDetails[parts].content[points]);
            }
            this.courseParts.push({
                id: this.courseDetails[parts].id, partName: this.courseDetails[parts].name,
                partDescription: this.courseDetails[parts].partDescription,
                partsPoint
            });
            console.log(this.courseParts);
        }
    }

    passCurrentPart() {
        this.currentPart = this.courseParts[this.partNumber];
        console.log(this.currentPart);

        if (this.currentPart !== undefined) {
            this.navigateToSectionPage(this.currentPart, `part${this.partNumber + 1}`);
        }
        else {
            this.isCourseCompleted = true;
            if (!this.wasCourseCompleted) {
                this.databaseService.completeCourses(this.userId, this.courseId, this.courseName,
                    this.courseImage).subscribe((resData: any) => { });
            }
        }
    }

    navigateToSectionPage(currentPart: Parts, id: string) {
        // this.homeService.getCourseContents(this.courseDetails.courseId, id).subscribe(res => {
            console.log(this.courseId);
            if (this.router.url.includes('tabs/home')) {

                this.router.navigate(['tabs/home/course-details/course-parts/course-section'], {
                    state: {
                        currentPart,
                        id,
                        courseId: this.courseId
                    }
                });
            } else   if (this.router.url.includes('tabs/courses')) {
                this.router.navigate(['tabs/courses/course-details/course-parts/course-section'], {
                    state: {
                        currentPart,
                        id,
                        courseId: this.courseId
                    }
                });
            }
        // });
    }

    getCourseContent() {
        this.homeService.getCourseContents(this.courseDetails.courseId, 'cChapterOne').subscribe(res => {
            console.log(res);
        });
    }

    wasCourseComplete() {
        // tslint:disable-next-line: forin
        for (let i in this.completedCourses) {
            console.log(this.completedCourses[i].courseId);
            if (this.courseId == this.completedCourses[i].courseId) {
                this.wasCourseCompleted = true;
            }
        }
    }
}
