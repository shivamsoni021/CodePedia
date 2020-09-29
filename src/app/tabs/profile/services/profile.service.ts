import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    
    constructor(private http : HttpClient){}

    getUserProfileData(userId : string){
        console.log(userId);
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userId}.json`);
    }

    getEnrolledCourse(userId: string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userId}/courseStudying.json`);
    }
}