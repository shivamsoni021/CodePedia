import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../database/database.service';
import { HomeTechnology } from '../../interfaces/home-technology.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    slidesPerView: 1.2,
  }

  technologyTitle :string = "Shivam";
  technologies : HomeTechnology[]; 
  constructor(private databaseService : DatabaseService,
  private menuController : MenuController,
    ) {}

  ngOnInit(){
    // this.databaseService.getDataObject().subscribe((resData:any) =>{
    //   const code = resData.allTechnology.aT
    //   console.log(resData.allTechnology);
    // });
    this.technologies =  this.databaseService.getDataObject();
  
  }
  

}
