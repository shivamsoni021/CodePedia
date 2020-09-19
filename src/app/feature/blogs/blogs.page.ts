import { Component, OnInit } from '@angular/core';
import { BlogsList } from './interface/blogs.interface';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.page.html',
    styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage implements OnInit {

    blogsList: BlogsList[] = [
        {
            blogId: 1,
            postTitle: 'How to integrate facebook ads in ionic app?',
            authorName: 'Shivam Soni',
            views: 100,
            timePublished: new Date(),
            shortDescription: 'This is test',
            image: 'https://pbs.twimg.com/profile_images/1148952014036054016/xxv7lLvp_400x400.jpg',
            tag: 'Ionic',
            isBookmarked: false
        },
        {
            blogId: 2,
            postTitle: 'How to integrate facebook ads in Android app?',
            authorName: 'Raja Soni',
            views: 10,
            timePublished: new Date(),
            shortDescription: 'This is test 2',
            image: 'https://pbs.twimg.com/profile_images/1148952014036054016/xxv7lLvp_400x400.jpg',
            tag: 'Android',
            isBookmarked: false
        },
        {
            blogId: 3,
            postTitle: 'How to integrate facebook ads in Angular app?',
            authorName: 'Shivam Soni',
            views: 1000,
            timePublished: new Date(),
            shortDescription: 'This is test 3',
            image: 'https://pbs.twimg.com/profile_images/1148952014036054016/xxv7lLvp_400x400.jpg',
            tag: 'Angular',
            isBookmarked: false
        },
        {
            blogId: 4,
            postTitle: 'How to integrate facebook ads in react app?',
            authorName: 'Raja Soni',
            views: 10000,
            timePublished: new Date(),
            shortDescription: 'This is test 4',
            image: 'https://pbs.twimg.com/profile_images/1148952014036054016/xxv7lLvp_400x400.jpg',
            tag: 'React',
            isBookmarked: false
        }
    ];

    constructor(private router: Router, private toastService: ToastService) { }

    ngOnInit() {
    }

    navigateToBlogDetailsPage(blogDetails: BlogsList): void {
        this.router.navigate(['/blog-details'], {
            state: {
                blogDetails
            }
        });
    }

    addToBookmark(blog: BlogsList) {
        blog.isBookmarked = !blog.isBookmarked;
        this.toastService.showToast('Bookmarked', 'success');
    }

}
