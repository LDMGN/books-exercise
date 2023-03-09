import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { BookEffects } from '../state/book-effects';
import { bookListFeature, bookListLoad } from '../state/book-list';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let store: Store;
  const booksObservable = new Subject();
  const bookServiceMock = {
    getBooks: () => booksObservable,
  };

  const dummyBooks: Book[] = [
    {
      title: 'Test book 1',
      publicationDate: '2023-03-09',
      author: 'Lennert',
    },
    {
      title: 'Test book 2',
      publicationDate: '2023-03-09',
      author: 'Lennert',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BookListComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        StoreModule.forRoot(),
        EffectsModule.forRoot(),
        StoreModule.forFeature(bookListFeature),
        EffectsModule.forFeature([
          BookEffects
        ]),
      ],
      providers: [
        {
          provide: BooksService,
          useValue: ((bookServiceMock as any) as BooksService),
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loader, then list of books', async () => {
    const fixture = TestBed.createComponent(BookListComponent);

    store.dispatch(bookListLoad());
    fixture.detectChanges();

    /* Application should show spinner when loading. */
    expect(fixture.nativeElement.querySelector('mat-spinner'))
      .toBeTruthy();

    booksObservable.next(dummyBooks);
    fixture.detectChanges();
    await fixture.whenStable().then(() => fixture.detectChanges());

    /* Spinner should not be visible once loaded. */
    expect(fixture.nativeElement.querySelector('mat-spinner'))
      .toBeFalsy();

    /* Book list should be visible. */
    const bookElements = fixture.nativeElement.querySelectorAll('.books .book');
    expect(bookElements.length).toEqual(2);

    expect(bookElements[0].querySelector('.title').textContent)
      .toEqual('Test book 1');
    expect(bookElements[1].querySelector('.title').textContent)
      .toEqual('Test book 2');
  });
});
