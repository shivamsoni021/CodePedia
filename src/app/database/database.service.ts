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

    number: string = "2";

    homeTechnologyArray: HomeTechnology[] = new Array();
    public homeTechnoNumber;
    public technologyNumber;
    technologyData: any;
    allTechnology: HomeTechnology[] = new Array();
    courseData: CourseData[] = new Array();
    courseId:string="";
    xp: number;
    totalXp :string;
    courseStudying : string[]=new Array();

    constructor(private http: HttpClient) {
    }

    getDataObject() {
        this.http.get('https://codeshala-6dd34.firebaseio.com/courses/homescreen.json').subscribe((resData: any) => {
            this.homeTechnoNumber = resData.number;
            for (let i = 1; i <= this.homeTechnoNumber; i++) {

                this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/homescreen/t${i}.json`).subscribe((languageData: any) => {

                    this.homeTechnologyArray.push({id:languageData.id , name: languageData.name, atDescription: languageData.description, imageUrl: languageData.imageUrl , wlearn: languageData.wlearn , requirement: languageData.requirement , benefits: languageData.benefits});

                });
            }

        });
        return this.homeTechnologyArray;
    }

    getAllCourses() {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_TECHNOLOGY}.json`);
    }

    getEnrolledCourse(userID :string , courseId:string){

        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userID}.json`);
    
    }
    
    enrollCourse(userID : string,courseId:string){
    
        return this.http.post(`https://codeshala-6dd34.firebaseio.com/users/${userID}/courseStudying.json`,
            {courseId});

    }

    isStudying(userID:string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userID}/courseStudying.json`);
    }

}