import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlogTagListPage } from './blog-tag-list.page';

describe('BlogTagListPage', () => {
  let component: BlogTagListPage;
  let fixture: ComponentFixture<BlogTagListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogTagListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogTagListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
