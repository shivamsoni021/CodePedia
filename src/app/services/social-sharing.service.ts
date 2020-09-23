import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
    providedIn: 'root'
})
export class SocialSharingService {

    constructor(private socialSharing: SocialSharing){}

    sharingViaFacebook(message: string, image?: string, url?: string) {
        return this.socialSharing.shareViaFacebook(message, image, url);
    }
    sharingViaTwitter(message: string, image?: string, url?: string) {
        return this.socialSharing.shareViaTwitter(message, image, url);
    }
    sharingViaWhatsapp(message: string, image?: string, url?: string) {
        return this.socialSharing.shareViaWhatsApp(message, image, url);
    }
}
