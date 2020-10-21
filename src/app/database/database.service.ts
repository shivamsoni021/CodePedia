import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, ENDPOINTS } from '../constants/app.constants';
import { HomeTechnology } from '../interfaces/home-technology.interface';

export interface CourseData {
    obsData: any;
    technologies: HomeTechnology[];
}
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    completedCourse = new Array();
    constructor(private http: HttpClient) { }

    getCourses(courseType: string) {
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/${courseType}.json`);
    }

    getEnrolledCourse(userID: string, courseId: string) {
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userID}.json`);
    }

    /**
     * This method is used for enrolling used to selected course
     * @param userID Users uuid
     * @param courseId course id
     */
    enrollCourse(userID: string, courseId: number) {
        return this.http.post(`https://codeshala-6dd34.firebaseio.com/users/${userID}/courseStudying.json`,
            { courseId, progress: 0 });
    }

    isStudying(userID: string) {
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userID}/courseStudying.json`);
    }

    completeCourses(userID: string, courseId: string, courseName: string, courseImage: string) {
        console.log(courseImage);
        return this.http.post(`https://codeshala-6dd34.firebaseio.com/users/${userID}/coursesCompleted.json`, {
            courseId, courseName, courseImage
        });
    }

    getCompletedCourses(userID: string) {
        this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userID}/coursesCompleted.json`)
            .subscribe((resData: any) => {
                for (const course in resData) {
                    this.completedCourse.push(resData[course]);
                }
            });
        console.log(this.completedCourse);
    }

    returnCompletedCourse() {
        return this.completedCourse;
    }
}