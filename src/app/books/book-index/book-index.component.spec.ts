import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BookIndexComponent } from './book-index.component';

describe('BookIndexComponent', () => {
  let component: BookIndexComponent;
  let fixture: ComponentFixture<BookIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookIndexComponent],
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore()
      ]
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
