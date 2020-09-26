import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SliderConfiguration, SliderType, SliderOrientation } from './constants/slider.constant';
import { IonSlide, IonSlides, IonInfiniteScroll } from '@ionic/angular';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

    // @Input() public sliderConfiguration: SliderConfiguration = {
    //     type: SliderType.PreviewWithDescription,
    //     orientation: SliderOrientation.Vertical,
    //     items: [{
    //         uniqueId: '2393',
    //         type: 'movie',
    //         imageSrc: 'https://image.tmdb.org/t/p/w500/MAjhrdXEGv3yqW3JWwN1jbAnfR.jpg',
    //         imageClass: '',
    //         name: 'Raaz',
    //         description: '2020-English-movie',
    //         rating: 4.5
    //     }, {
    //         uniqueId: '2393',
    //         type: 'movie',
    //         imageSrc: 'https://image.tmdb.org/t/p/w500/yKNaVgZVdRwlV0nmJJfy7jeYoQE.jpg',
    //         imageClass: '',
    //         name: 'Raaz',
    //         description: '2020-English-movie',
    //         rating: 4.5
    //     }, {
    //         uniqueId: '2393',
    //         type: 'movie',
    //         imageSrc: 'https://image.tmdb.org/t/p/w500/MAjhrdXEGv3yqW3JWwN1jbAnfR.jpg',
    //         imageClass: '',
    //         name: 'Raaz',
    //         description: '2020-English-movie',
    //         rating: 4.5
    //     }, {
    //         uniqueId: '2393',
    //         type: 'movie',
    //         imageSrc: 'https://image.tmdb.org/t/p/w500/yKNaVgZVdRwlV0nmJJfy7jeYoQE.jpg',
    //         imageClass: '',
    //         name: 'Raaz',
    //         description: '2020-English-movie',
    //         rating: 4.5
    //     }, {
    //         uniqueId: '2393',
    //         type: 'movie',
    //         imageSrc: 'https://image.tmdb.org/t/p/w500/MAjhrdXEGv3yqW3JWwN1jbAnfR.jpg',
    //         imageClass: '',
    //         name: 'Raaz',
    //         description: '2020-English-movie',
    //         rating: 4.5
    //     }],
    //     sliderOptions: {
    //         slidesPerView: 2,
    //         freeMode: true,
    //         spaceBetween: 10
    //     }
    // };

    /** Slider configuration */
    @Input() public sliderConfiguration: SliderConfiguration;
    /** Event emitter to handle item click */
    @Output() public itemClick: EventEmitter<any> = new EventEmitter();
    @Output() public addToWatchlist: EventEmitter<any> = new EventEmitter();
    alreadyInWatchlist = false;
    @Output() public addToWatched: EventEmitter<any> = new EventEmitter();
    @Output() public loadMore: EventEmitter<any> = new EventEmitter();

    @ViewChild('slides') slides: IonSlides;
    @ViewChild('IonInfiniteScroll') infiniteScroll: IonInfiniteScroll;

    constructor() { }

    ngOnInit() { }

    reachEnd(e) {
        this.loadMore.emit();
    }

    addToMovieSeriesWatchlist(index, alreadyInWatchlist, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.sliderConfiguration.items[index].inWatchList = alreadyInWatchlist;
        this.addToWatchlist.emit({ index, alreadyInWatchlist });
    }

    onPress(index, alreadyWatched, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.sliderConfiguration.items[index].isWatched = alreadyWatched;
        this.addToWatched.emit({ index, alreadyWatched });
    }

    loadData(event) {
        this.loadMore.emit(event);
        setTimeout(() => {
            if (event.target) {
                event.target.complete();
            }
        }, 500);
    }
}
