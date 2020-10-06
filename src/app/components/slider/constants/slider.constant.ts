/** Type of slider:
 * PreviewOnly - Consists of only image
 * PreviewWithDescription - Consists of image, name, description and rating
 */
export enum SliderType {
    PreviewOnly = 'preview',
    PreviewWithDescription = 'preview-desc'
}

/** Describes the orientation of slider */
export enum SliderOrientation {
    Horizontal = 'horizontal',
    Vertical = 'vertical'
}

/** Slider item interface */
export interface SliderItem {
    id: string;
    type: 'tag' | 'course';
    imageSrc?: string;
    imageClass?: string;
    name?: string;
    nameClass?: string;
    description?: string;
    descriptionClass?: string;
    rating?: number;
    ratingClass?: string;
    ratingIcon?: string;
    ratingIconClass?: string;
    inWatchList?: boolean;
    isWatched?: boolean;
    mediaUuid?: string;
    requirement?: string;
    benefits?: string;
    wlearn?: string;
    courseType?;
    parts?;
    
}

/** Slider configuration interface for slider component */
export interface SliderConfiguration {
    type: SliderType;
    orientation: SliderOrientation;
    items: Array<SliderItem>;
    sliderOptions?: any;
}
