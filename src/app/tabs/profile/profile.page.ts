import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
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
  constructor(private authService : AuthService,
  private profileService : ProfileService) { }
  userId="";
  coursesCompleted:string[];
  coursesStudying:string[];
  badgesImageUrl:string[];
  badges:string[];
  name:string;
  emailId:string;
  xp:string;
  profileUrl;
  badgeArray:{badgeName:string , badgeImage:string}[]=new Array();

  ngOnInit() {
    this.userId=this.authService.getUserId();
    console.log(this.userId);
    this.profileService.getUserProfileData(this.userId).subscribe((resData:any)=>{
        
      this.setAllValues(resData);
    });
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
    this.isBadges= !this.isBadges;
  }

  setAllValues(profileData : any){
    this.coursesCompleted = profileData.coursesCompleted.split(",");
    // this.coursesStudying = profileData.courseStudying.split(",");
    this.badges = profileData.badges.split(",");
    this.badgesImageUrl = profileData.badgesImagesUrl.split("TOSPLIT");
    this.name = profileData.name;
    this.emailId = profileData.email;
    this.xp = profileData.xp;
    this.profileUrl = profileData.imageUrl;
    this.setBadgeValue();
  }

  setBadgeValue(){

    for(let i=0; i<this.badges.length; i++){
      this.badgeArray.push({badgeName :this.badges[i], badgeImage:this.badgesImageUrl[i]});
  }
  
}
}
