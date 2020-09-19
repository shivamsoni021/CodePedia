export interface BlogsList {
    blogId: number;
    image: string;
    authorName: string;
    views: number;
    timePublished: Date;
    postTitle: string;
    shortDescription: string;
    tag: string;
    isBookmarked?: boolean;
}
