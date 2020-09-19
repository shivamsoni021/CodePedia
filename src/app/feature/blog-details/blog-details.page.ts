import { Component, OnInit } from '@angular/core';
import { BlogsList } from '../blogs/interface/blogs.interface';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.page.html',
  styleUrls: ['./blog-details.page.scss'],
})
export class BlogDetailsPage implements OnInit {

    blogDetails: BlogsList;

  constructor() { }

  ngOnInit() {
      this.blogDetails = window.history.state.blogDetails;
  }

}
