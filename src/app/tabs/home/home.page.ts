import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from '../../database/database.service';
import { HomeTechnology } from '../../interfaces/home-technology.interface';
import { HomeFormatterService } from './services/home-formatter.service';
import { SliderConfiguration } from 'src/app/components/slider/constants/slider.constant';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    slideOpts = {
        slidesPerView: 2,
    };
    userId: string;
    technologyTitle = 'Shivam';
    technologies: SliderConfiguration;
    isStudying;

    constructor(
        private databaseService: DatabaseService,
        private authService: AuthService,
        private homeFormatterService: HomeFormatterService
    ) { }

    ngOnInit() {
        // this.databaseService.getDataObject().subscribe((resData:any) =>{
        //   const code = resData.allTechnology.aT
        //   console.log(resData.allTechnology);
        // });
        this.userId = this.authService.getUserId();
        this.loadTechnologyData();
    }

    /**
     * This method is used for loading technology data and format it
     */
    loadTechnologyData() {
        const data = this.databaseService.getDataObject();
        if (data.length) {
            this.technologies = this.homeFormatterService.getFormattedTechnologyData(data);
        } else {
            setTimeout(() => { this.loadTechnologyData(); } , 2000);
        }
    }

    /**
     * This method is used for navigating to course details page
     * @param courseDetails course details
     */
    navigateToCoursePage(courseDetails) {
        console.log(courseDetails);
    }

}
