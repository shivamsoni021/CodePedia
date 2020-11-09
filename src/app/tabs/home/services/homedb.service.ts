import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, ENDPOINTS } from 'src/app/constants/app.constants';

@Injectable({
    providedIn: 'root'
})
export class HomeDatabase {
    constructor(private http: HttpClient) { }

    loadEnrolledCourse(courseId: string) {
        let courseType = '';

        if (courseId.match('a')) {
            courseType = 'allTechnology';
        }
        else if (courseId.match('tt')) {
            courseType = 'trending';
        }
        else if (courseId.match('st')) {
            courseType = 'scripting';
        }
        else if (courseId.match('wt')) {
            courseType = 'webTech';
        }
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/${courseType}/${courseId}.json`);
    }

    loadSuggestedCourse() {
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/homescreen.json`);
    }

    postAllCoursesToFirebase(requestParams = {}) {
        return this.http.post(`${BASE_URL}/${ENDPOINTS.ALL_COURSES}.json`, requestParams);
    }

    /**
     * This method is used for getting all courses list
     */
    getAllCoursesList() {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_COURSES}.json`);
    }

    /**
     * This method is used for getting courses list based on their types like new or trending
     * @param type course type ex trending or new
     */
    getCoursesByParams(type: string) {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_COURSES}.json?orderBy="${type}"&equalTo=true`);
    }

    /**
     * This method is used for getting courses list based on their types like new or trending
     * @param type course type ex trending or new
     */
    getCoursesByCategory(category: string) {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_COURSES}.json?orderBy="category"&equalTo="${category}"`);
    }

    /**
     * This method is used for getting enrolled courses
     * @param courseId selected course id
     */
    getEnrolledCourses(courseId: number) {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_COURSES}.json?orderBy="courseId"&equalTo=${courseId}`);
    }

    postCoursesDetailsToFirebase(requestParams = {}) {
        return this.http.post(`${BASE_URL}/${ENDPOINTS.COURSE_DETAILS}.json`, requestParams);
    }

    /**
     * This method is used for getting selected course details
     * @param courseId course id for which we need to show details
     */
    getCourseDetails(courseId: number) {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.COURSE_DETAILS}.json?orderBy="courseId"&equalTo=${courseId}`);
    }

    postCoursesContentsToFirebase(requestParams = {}, courseId: number) {
        return this.http.post(`${BASE_URL}/${ENDPOINTS.COURSE_CONTENT}/${courseId}.json`, requestParams);
    }

    /**
     * This method is used for getting course content
     * @param courseId Selected course id
     * @param chapterName selected chapter name
     */
    getCourseContents(courseId: number, chapterName: string) {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.COURSE_CONTENT}/${courseId}.json?orderBy="chapterId"&equalTo="${chapterName}"`);
    }

    postCoursesCommentsToFirebase(requestParams = {}, courseId: number) {
        return this.http.post(`${BASE_URL}/${ENDPOINTS.USER_COMMENTS}/${courseId}.json`, requestParams);
    }

    getCourseComments(courseId) {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.USER_COMMENTS}/${courseId}.json`);
    }

}
