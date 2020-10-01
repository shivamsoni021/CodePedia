import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HomeDatabase{
    constructor(private http : HttpClient){}

    loadEnrolledCourse(courseId:string){
        let courseType="";

        if(courseId.match("a")){
            courseType = "allTechnology";
        }
        else if(courseId.match("tt")){
            courseType = "trending";
        }
        else if(courseId.match("st")){
            courseType= "scripting";
        }
        else if(courseId.match("wt")){
            courseType="webTech";
        }
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/${courseType}/${courseId}.json`);
    }

    loadSuggestedCourse(){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/homescreen.json`);
    }
}