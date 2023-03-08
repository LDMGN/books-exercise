import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIndexComponent } from './book-index.component';

describe('BookIndexComponent', () => {
  let component: BookIndexComponent;
  let fixture: ComponentFixture<BookIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
