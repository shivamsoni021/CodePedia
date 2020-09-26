import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { BlogsList } from './interface/blogs.interface';
import { BlogService } from './services/blog.service';
import { NAVIGATION_PATHS } from 'src/app/constants/navigation.constants';
import { LoadingService } from 'src/app/services/loading.service';
import { SliderConfiguration } from 'src/app/components/slider/constants/slider.constant';
import { BlogFormatterService } from './services/blogs-formatter.service';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.page.html',
    styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage {

    /** This variable contains the blog list of type BlogsList */
    blogsList: BlogsList[] = [];
    /** This variable contains tags list */
    tagList: SliderConfiguration;

    /** @ignore */
    constructor(
        private router: Router,
        private toastService: ToastService,
        private blogService: BlogService,
        private loadingService: LoadingService,
        private blogFormatterService: BlogFormatterService
    ) { }

    /** @ignore */
    ionViewWillEnter() {
        // this.loadingService.showLoader();
        this.getBlogData();
        this.loadAllTags();
    }

    /**
     * This method us used for navigating to blog details page
     * @param blogDetails selected blog details
     */
    navigateToBlogDetailsPage(blogDetails: BlogsList): void {
        this.router.navigate([NAVIGATION_PATHS.BLOG_DETAILS], {
            state: {
                blogDetails
            }
        });
    }

    /**
     * This method is used for adding blog to bookmark
     * @param blog contains blog which we have to bookmark
     */
    addToBookmark(blog: BlogsList) {
        blog.isBookmarked = !blog.isBookmarked;
        this.toastService.showToast('Bookmarked', 'success');
    }

    /**
     * This method is used for getting blog data form the firebase
     */
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

    /** This method is used for loading all tags list */
    loadAllTags() {
        this.tagList = this.blogFormatterService.getFormattedBlogTagList();
    }

    /**
     * This method is used for gloading data by tagname from firebase
     * @param tagName selected tag name
     */
    loadDataByTagName(tagName: any) {
        this.loadingService.showLoader();
        this.blogService.loadBlogByTagName(tagName.name).subscribe(blogListByTagName => {
            const blogList = [];
            // tslint:disable-next-line: forin
            for (const blog in blogListByTagName) {
                blogList.push(blogListByTagName[blog]);
            }
            this.router.navigate([NAVIGATION_PATHS.BLOG_TAG_LIST], {
                state: {
                    blogList,
                    tagName: tagName.name
                }
            });
        });
    }

}
