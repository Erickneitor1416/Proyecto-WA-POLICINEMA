import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewBodyComponent } from './add-review-body.component';

describe('AddReviewBodyComponent', () => {
  let component: AddReviewBodyComponent;
  let fixture: ComponentFixture<AddReviewBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReviewBodyComponent]
    });
    fixture = TestBed.createComponent(AddReviewBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
