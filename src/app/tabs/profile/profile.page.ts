import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { DatabaseService } from 'src/app/database/database.service';
import { AuthService } from 'src/auth/auth.service';
import { ProfileService } from './services/profile.service';

interface ProfileData{
  
  name:string;
  email:string;
  xp:string;
  badges: string;
  courseStudying:string;
  coursesCompleted:string;
  imageUrl:string;
  badgesImagesUrl:string;

}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isBadges=true;
  userId="";
  coursesCompleted;
  coursesStudying:string[]=new Array();
  badges:{ badge:string ,badgeDesc: string, imageUrl:string }[] = new Array();
  name:string;
  emailId:string;
  xp:string;
  profileUrl;
  badgeArray:{badgeName:string , badgeImage:string}[]=new Array();

  constructor(private authService : AuthService,
    private profileService : ProfileService,
    private databaseService: DatabaseService) { } 
  
    ngOnInit() {
    this.userId=this.authService.getUserId();
    console.log(this.userId);
    this.coursesCompleted = this.databaseService.returnCompletedCourse();
    console.log(this.coursesCompleted);
    this.profileService.getUserProfileData(this.userId).subscribe((resData:any)=>{        
      this.setAllValues(resData);
    });
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
    this.isBadges= !this.isBadges;
  }

  setAllValues(profileData : any){

    // for(const course in profileData.coursesCompleted){
    //   this.coursesCompleted.push({name : profileData.coursesCompleted[course].name,
    //     imageUrl: profileData.coursesCompleted[course].imageUrl,
    //     desc: profileData.coursesCompleted[course].desc});
    // }

    for(const badge in profileData.badges){
        this.badges.push({badge: profileData.badges[badge].badge 
          , badgeDesc: profileData.badges[badge].badgeDesc 
          , imageUrl : profileData.badges[badge].imageUrl});
    }
    this.name = profileData.name;
    this.emailId = profileData.email;
    this.xp = profileData.xp;
    this.profileUrl = profileData.imageUrl;
  }
}
