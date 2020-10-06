import { Injectable } from '@angular/core';
import { SliderConfiguration, SliderType, SliderOrientation } from 'src/app/components/slider/constants/slider.constant';
import { CoursePartsPage } from '../../courses/course-details/course-parts/course-parts.page';

@Injectable({
    providedIn: 'root'
})
export class HomeFormatterService {

    /** @ignore */
    constructor() { }

    /**
     * This method is used for returning formatted technology data
     * @param technologyData contains all technology data
     */
    getFormattedTechnologyData(technologyData): SliderConfiguration {
        const formattedData: SliderConfiguration = {
            type: SliderType.PreviewWithDescription,
            orientation: SliderOrientation.Horizontal,
            items: [],
            sliderOptions: {
                slidesPerView: 3,
                freeMode: true,
                spaceBetween: 10
            }
        };
        technologyData.forEach(filteredItem => {
            formattedData.items.push({
                id: filteredItem.id,
                type: 'course',
                imageSrc: filteredItem.imageUrl,
                name: filteredItem.name || filteredItem.atName,
                description: filteredItem.atDescription,
                requirement: filteredItem.requirement,
                benefits: filteredItem.benefits,
                wlearn: filteredItem.wlearn,
                parts: filteredItem.parts, 
                courseType:filteredItem.courseType
            });
        });
        return formattedData;
    }

}
