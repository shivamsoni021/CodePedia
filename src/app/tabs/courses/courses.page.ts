import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeTechnology } from 'src/app/interfaces/home-technology.interface';
import { DatabaseService } from '../../database/database.service';
import { CoursesFormatterService } from './services/courses-formatter.service';
import { SliderConfiguration } from 'src/app/components/slider/constants/slider.constant';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.page.html',
    styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

    allTechnology: HomeTechnology[] = new Array();
    coursesData: any;
    obsData: any;
    selectData: string;
    allTechnologySliderConfig: SliderConfiguration;

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
            }
            this.allTechnologySliderConfig = this.coursesFormatterService.getFormattedCoursesData(this.allTechnology);
        });
    }

    public test(event, item) {
        this.selectData = item;
    }

    navigateToCoursePage(courseDetails: HomeTechnology): void {
        this.router.navigate(['tabs/courses/course-details'], {
            state: {
                courseDetails
            }
        });
    }
    segmentChanged() { }
}
