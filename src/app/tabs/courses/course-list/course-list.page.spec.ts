import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseListPage } from './course-list.page';

describe('CourseListPage', () => {
  let component: CourseListPage;
  let fixture: ComponentFixture<CourseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
