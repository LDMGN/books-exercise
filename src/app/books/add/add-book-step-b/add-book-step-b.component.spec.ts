import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookStepBComponent } from './add-book-step-b.component';

describe('AddBookStepBComponent', () => {
  let component: AddBookStepBComponent;
  let fixture: ComponentFixture<AddBookStepBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookStepBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookStepBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
