import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseSectionPage } from './course-section.page';

describe('CourseSectionPage', () => {
  let component: CourseSectionPage;
  let fixture: ComponentFixture<CourseSectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
