import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursePartsPage } from './course-parts.page';

describe('CoursePartsPage', () => {
  let component: CoursePartsPage;
  let fixture: ComponentFixture<CoursePartsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePartsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursePartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
