import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';
import { DatabaseService, CourseData } from '../../database/database.service';
import { CoursesFormatterService } from './services/courses-formatter.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.page.html',
    styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

    allTechnology: HomeTechnology[] = new Array();
    coursesData: any;
    obsData: any;
    slideOpts = {
        slidesPerView: 2,
    }
    selectData: string;

    allTechnologySliderConfig;
    constructor(
        private databaseService: DatabaseService,
        private router: Router,
        private coursesFormatterService: CoursesFormatterService
        ) { }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.getAllCourses();
    }

    getAllCourses() {
        this.databaseService.getAllCourses().subscribe((allCourses: HomeTechnology) => {
            // tslint:disable-next-line: forin
            for (const courses in allCourses) {
                this.allTechnology.push(allCourses[courses]);
                console.log(allCourses[courses]);
            }
            console.log(this.allTechnology);
            console.log(this.allTechnology.length)
            this.allTechnologySliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.allTechnology);
    })
    }

    public test(event, item) {
        this.selectData = item;
    }

    navigateToCoursePage(courseDetails: HomeTechnology): void {
        this.router.navigate(["tabs/courses/course-details"], {
            state: {
                courseDetails
            }
        });
    }
    segmentChanged() { }
}
