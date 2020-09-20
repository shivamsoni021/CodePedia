import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeTechnology } from '../interfaces/home-technology.interface';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService{
    
    number:string= "2";

    homeTechnologyArray : HomeTechnology[] = new Array();
    public homeTechnoNumber;
    constructor(private http : HttpClient){
    }

    getDataObject(){
       this.http.get('https://codeshala-6dd34.firebaseio.com/courses/homescreen.json').subscribe((resData:any)=>{
            this.homeTechnoNumber = resData.number;
            for(let i=1; i<=this.homeTechnoNumber ; i++){
                    
                this.http.get(`https://codeshala-6dd34.firebaseio.com/courses/homescreen/t${i}.json`).subscribe((languageData:any)=>{
                    
                    this.homeTechnologyArray.push({name : languageData.name, description : languageData.description, imageUrl :languageData.imageUrl});

                });
            }
            
       } );
      return this.homeTechnologyArray;
    }

    getAllData(resData :any){

    }
}