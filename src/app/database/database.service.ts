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

    constructor(private http: HttpClient) {
    }

    getCourses(courseType:string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/${courseType}.json`);
    }
    
    getEnrolledCourse(userID :string , courseId:string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userID}.json`);
    }
    
    enrollCourse(userID : string,courseId:string){
        return this.http.post(`https://codeshala-6dd34.firebaseio.com/users/${userID}/courseStudying.json`,
            {courseId,progress:""});
    }

    isStudying(userID:string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userID}/courseStudying.json`);
    }
}



