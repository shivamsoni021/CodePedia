import { Injectable } from '@angular/core';
import { SliderConfiguration, SliderType, SliderOrientation } from 'src/app/components/slider/constants/slider.constant';

@Injectable({
    providedIn: 'root'
})
export class CoursesFormatterService {
    constructor() {}
    
    getFormattedCoursesData(data) {
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
        data.forEach(filteredItem => {
            formattedData.items.push({
                uniqueId: filteredItem.id,
                type: 'course',
                imageSrc: filteredItem.imageUrl,
                name: filteredItem.atName,
                description: filteredItem.atDescription,
            });
        });
        return formattedData;
    }
}
