import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HomeDatabase{
    constructor(private http : HttpClient){}

    loadEnrolledCourse(courseId:string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/allTechnology/${courseId}.json`);
    }

    loadSuggestedCourse(){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/homescreen.json`);
    }
}