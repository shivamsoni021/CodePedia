import { Component, OnInit } from '@angular/core';
import { BlogsList } from 'src/app/tabs/blogs/interface/blogs.interface';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-blog-tag-list',
    templateUrl: './blog-tag-list.page.html',
    styleUrls: ['./blog-tag-list.page.scss'],
})
export class BlogTagListPage implements OnInit {

    blogsList: BlogsList[] = [];
    tagName: string;
    constructor(private loadingService: LoadingService) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.blogsList = window.history.state.blogList;
        this.tagName = window.history.state.tagName;
        this.loadingService.hideLoader();
    }

}
