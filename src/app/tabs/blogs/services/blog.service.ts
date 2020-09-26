import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogsList } from '../interface/blogs.interface';
import { BASE_URL, ENDPOINTS } from 'src/app/constants/app.constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    /** @ignore */
    constructor(private httpClient: HttpClient) { }

    /**
     * This method is used for posting blog to firebase
     * @param requestObject ciontains blog details
     */
    postBlogsData(requestObject: BlogsList) {
        return this.httpClient.post(`${BASE_URL}/${ENDPOINTS.BLOGS}`, requestObject);
    }

    /**
     * This method is used for getting blog list from firebase
     */
    getBlogsData() {
        return this.httpClient.get(`${BASE_URL}/${ENDPOINTS.BLOGS}`);
    }

    /**
     * This method is used for getting blog list by tag name
     * @param tagName tagname for which we need to get data
     */
    loadBlogByTagName(tagName: string) {
        return this.httpClient.get(`${BASE_URL}/${ENDPOINTS.BLOGS}?orderBy="tag"&equalTo="${tagName}"`);
    }
}
