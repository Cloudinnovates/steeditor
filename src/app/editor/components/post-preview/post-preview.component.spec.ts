import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPreviewComponent } from './post-preview.component';

// this component is gonna be changed much, don't write tests for it now
describe('PostPreviewComponent', () => {
  let component: PostPreviewComponent;
  let fixture: ComponentFixture<PostPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostPreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
