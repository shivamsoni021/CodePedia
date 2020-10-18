import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from '../../database/database.service';
import { HomeFormatterService } from './services/home-formatter.service';
import { SliderConfiguration } from 'src/app/components/slider/constants/slider.constant';
import { ProfileService } from '../profile/services/profile.service';
import { HomeDatabase } from './services/homedb.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    slideOpts = {
        slidesPerView: 2,
    };
    userId: string;
    technologyTitle = 'Shivam';
    technologies: SliderConfiguration;
    isStudying = false;
    enrolledCourses: SliderConfiguration;
    suggestedCourses: SliderConfiguration;
    coursePreference = '';
    constructor(
        private authService: AuthService,
        private homeFormatterService: HomeFormatterService,
        private profileService: ProfileService,
        private homeService: HomeDatabase,
        private router: Router,
        private databaseService: DatabaseService
    ) { }

    ngOnInit() {
        this.userId = this.authService.getUserId();
        this.loadEnrolledCourse();
        this.databaseService.getCompletedCourses(this.userId);
        this.loadSuggestedCourse();
    }

    loadEnrolledCourse() {
        const temData = [];
        this.profileService.getEnrolledCourse(this.userId).subscribe((resData: any) => {
            // tslint:disable-next-line: forin
            for (const course in resData) {
                this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data: any) => {
                    temData.push(data);
                    if (temData.length) {
                        this.enrolledCourses = this.homeFormatterService.getFormattedTechnologyData(temData);
                    }
                });
            }
        });
    }

    loadSuggestedCourse() {
        const temData = [];
        this.homeService.loadSuggestedCourse().subscribe((resData: any) => {
            // tslint:disable-next-line: forin
            for (const course in resData) {
                this.homeService.loadEnrolledCourse(resData[course].courseId).subscribe((data: any) => {
                    temData.push(data);
                    console.log(temData);
                    if (temData.length) {
                        this.suggestedCourses = this.homeFormatterService.getFormattedTechnologyData(temData);
                        console.log(this.suggestedCourses);
                    }
                });
            }
        });
    }

    navigateToCoursePage(courseDetails) {
        const courseType = courseDetails.courseType;
        this.router.navigate(['tabs/courses/course-details'], {
            state: {
                courseDetails,
                courseType
            }
        });
    }

    navigation(preference) {
        if (preference === 'all-courses') {
            this.coursePreference = 'all-courses';
        }
        else {
            this.coursePreference = 'studying';
        }
        const coursePreference = preference;
        this.router.navigate(['tabs/courses'], {
            state: {
                coursePreference
            }
        });

    }

    postCourseToDb() {
        const reqBody = {
            description: 'This is very good course',
            courseName: 'C',
            imageSrc: '',
            category: 'Programming Language',
            isTrending: false,
            isNew: false,
            courseId: 123,
            courseAuthor: 'Shivam Soni',
            enrolledStudents: 50,
            ratings: 4.5
        };
        this.homeService.postAllCoursesToFirebase(reqBody).subscribe(res => {
            console.log('res', res);
        });
    }

    postCourseDetails() {
        const reqBody = {
            courseId: 123,
            courseIndex: {
                chapterOne: {
                    name: 'C Basics',
                    id: 'cChapterOne',
                    content: {
                        point1: 'Compilation',
                        point2: 'Source Code',
                        point3: 'What is C?'
                    }
                },
                chapterTwo: {
                    name: 'Loops',
                    id: 'cChapterTwo',
                    content: {
                        point1: 'For Loop',
                        point2: 'While Loop',
                        point3: 'Do While Loop'
                    }
                }
            },
            benefits: ['You can get Job in any fields', 'Get started with programming'],
            requirements: ['PC', 'Internet Connection'],
            authorName: 'Shivam Soni',
            ratings: 4.5,
            enrollments: 50000,
            description: 'abusf fahnsoif aosbfias basof'
        };

        this.homeService.postCoursesDetailsToFirebase(reqBody).subscribe(res => {
            console.log('cd', res);
        })
    }

    postCourseContentsToDb() {
        const reqBody = {
            chapterId: 'cChapterOne',
            point1: {
                name: 'Compilation',
                data: '10101010',
                imageUrl: ''
            },
            point2: {
                name: 'Source Code',
                data: '10101010',
                imageUrl: ''
            },
            point3: {
                name: 'What is C?',
                data: '10101010',
                imageUrl: ''
            }

        };
        this.homeService.postCoursesContentsToFirebase(reqBody, 123).subscribe(res => {
            console.log('cd', res);
        });
    }

    postCoursesCommentsToFirebase() {
        const reqBody = {
            userName: 'Shiva,m',
            timeStamp: new Date(),
            rating: 5,
            comments: 'Very Good Course'
        };
        this.homeService.postCoursesCommentsToFirebase(reqBody, 123).subscribe(res => {
            console.log('cd', res);
        });
    }

    getCourse() {
        this.homeService.getAllCoursesList().subscribe(res => {
            console.log(res);
        })
    }


    getCourseDetails() {
        this.homeService.getCourseDetails(123).subscribe(res => {
            console.log(res);
        })
    }

    getCourseComments() {
        this.homeService.getCourseComments(123).subscribe(res => {
            console.log(res);
        })
    }

    getCourseContent() {
        this.homeService.getCourseContents(123,'cChapterOne').subscribe(res => {
            console.log(res);
        })
    }
}
