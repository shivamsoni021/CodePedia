import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { BlogsList } from './interface/blogs.interface';
import { BlogService } from './services/blog.service';
import { NAVIGATION_PATHS } from 'src/app/constants/navigation.constants';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.page.html',
    styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage {

    blogsList: BlogsList[] = [];

    constructor(
        private router: Router,
        private toastService: ToastService,
        private blogService: BlogService,
        private loadingService: LoadingService
    ) { }

    ionViewWillEnter() {
        this.loadingService.showLoader();
        this.getBlogData();
    }

    navigateToBlogDetailsPage(blogDetails: BlogsList): void {
        this.router.navigate([NAVIGATION_PATHS.BLOG_DETAILS], {
            state: {
                blogDetails
            }
        });
    }

    addToBookmark(blog: BlogsList) {
        blog.isBookmarked = !blog.isBookmarked;
        this.toastService.showToast('Bookmarked', 'success');
    }

    getBlogData() {
        this.blogService.getBlogsData().subscribe((res: any) => {
            // tslint:disable-next-line: forin
            for (const blog in res) {
                this.blogsList.push(res[blog]);
            }
            this.loadingService.hideLoader();
        });
    }

    ionViewDidLeave() {
        this.blogsList = [];
    }

}
