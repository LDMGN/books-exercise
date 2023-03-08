import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookStepAComponent } from './add-book-step-a.component';

describe('AddBookStepAComponent', () => {
  let component: AddBookStepAComponent;
  let fixture: ComponentFixture<AddBookStepAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookStepAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookStepAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
