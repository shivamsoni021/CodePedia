import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContentService{
    
    constructor(private http: HttpClient){}

    getContent(id:string,coursetype:string,courseId:string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/${coursetype}/${courseId}/content/${id}.json`);
    }
}