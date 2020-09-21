import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }

}
