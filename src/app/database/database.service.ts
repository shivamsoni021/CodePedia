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

    constructor(private http: HttpClient) {
    }

    getDataObject() {
        this.http.get('https://codeshala-6dd34.firebaseio.com/courses/homescreen.json').subscribe((resData: any) => {
            this.homeTechnoNumber = resData.number;
            for (let i = 1; i <= this.homeTechnoNumber; i++) {

                this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/homescreen/t${i}.json`).subscribe((languageData: any) => {

                    this.homeTechnologyArray.push({ name: languageData.name, description: languageData.description, imageUrl: languageData.imageUrl });

                });
            }

        });
        return this.homeTechnologyArray;
    }

    // getAllCourses() {
    //     this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_TECHNOLOGY}.json`)
    //         .subscribe((resData: any) => {

    //             this.technologyNumber = resData.atNumber;
    //             this.technologyData = resData;
    //             console.log(resData);
    //             for (let i = 1; i <= this.technologyNumber; i++) {
    //                 this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_TECHNOLOGY}/aT${i}.json`)
    //                     .subscribe((data: any) => {
    //                         console.log(data);
    //                         this.technologyData = data;
    //                         this.allTechnology.push({ name: data.atName, description: data.atDescription, imageUrl: data.imageUrl });
    //                     });
    //             }


    //         })
    //     console.log(this.courseData);
    //     return {
    //         technologyData: this.technologyData,
    //         allTechnology: this.allTechnology
    //     };

    // }

    getAllCourses() {
        return this.http.get(`${BASE_URL}/${ENDPOINTS.ALL_TECHNOLOGY}.json`);
    }

    getCoursesData() {

    }
}