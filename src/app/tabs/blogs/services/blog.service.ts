import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogsList } from '../interface/blogs.interface';
import { BASE_URL, ENDPOINTS } from 'src/app/constants/app.constants';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private httpClient: HttpClient) { }

    postBlogsData(requestObject: BlogsList) {
        return this.httpClient.post(`${BASE_URL}/${ENDPOINTS.BLOGS}`, requestObject);
    }

    getBlogsData() {
        return this.httpClient.get(`${BASE_URL}/${ENDPOINTS.BLOGS}`);
    }

    loadBlogByTagName(tagName: string) {
        return this.httpClient.get(`${BASE_URL}/${ENDPOINTS.BLOGS}?orderBy="tag"&equalTo="${tagName}"`);
    }
}
