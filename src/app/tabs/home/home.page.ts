import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../database/database.service';
import { HomeTechnology } from '../../interfaces/home-technology.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  homeTechnologyArray : HomeTechnology[]; 
  constructor(private databaseService : DatabaseService,
  ) {}

  ngOnInit(){
    // this.databaseService.getDataObject().subscribe((resData:any) =>{
    //   const code = resData.allTechnology.aT
    //   console.log(resData.allTechnology);
    // });
    this.homeTechnologyArray =  this.databaseService.getDataObject();
    console.log(this.homeTechnologyArray);
  }
  

}
