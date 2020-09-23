import { Component, OnInit } from '@angular/core';
import { BlogsList } from 'src/app/tabs/blogs/interface/blogs.interface';
import { SocialSharingService } from 'src/app/services/social-sharing.service';
import { SOCIAL_MEDIA_PLATFORMS } from 'src/app/constants/app.constants';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.page.html',
    styleUrls: ['./blog-details.page.scss'],
})
export class BlogDetailsPage implements OnInit {

    blogDetails: BlogsList;

    constructor(
        private socialSharingService: SocialSharingService,
        private loadingService: LoadingService
        ) { }

    ngOnInit() {
        this.blogDetails = window.history.state.blogDetails;
    }

    async sharePost(platformType: string) {
        if (platformType === SOCIAL_MEDIA_PLATFORMS.FACEBOOK) {
           await this.socialSharingService.sharingViaFacebook(this.blogDetails.postTitle, this.blogDetails.image);
        } else if (platformType === SOCIAL_MEDIA_PLATFORMS.WHATSAPP) {
            await this.socialSharingService.sharingViaWhatsapp(this.blogDetails.postTitle, this.blogDetails.image);
        } else if (platformType === SOCIAL_MEDIA_PLATFORMS.TWITTER) {
            await this.socialSharingService.sharingViaTwitter(this.blogDetails.postTitle, this.blogDetails.image);
        }
    }
}
