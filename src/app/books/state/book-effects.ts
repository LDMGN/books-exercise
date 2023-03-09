import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { BooksService } from '../books.service';
import { bookListLoad, bookListLoaded } from './book-list';
import { newBookReset, newBookStore } from './new-book';

@Injectable()
export class BookEffects {
  storeNewBook$ = createEffect(() => this._actions$
    .pipe(
      ofType(newBookStore),
      exhaustMap((storeBookAction) => this._bookService.addBook(storeBookAction.book)
        .pipe(
          map(() => newBookReset()),
          catchError(() => EMPTY)
        ))
    )
  );

  bookListRefresh$ = createEffect(() => this._actions$
    .pipe(
      ofType(newBookReset),
      map(() => bookListLoad()),
      catchError(() => EMPTY)
    )
  );

  bookListLoad$ = createEffect(() => this._actions$
    .pipe(
      ofType(bookListLoad),
      exhaustMap(() => this._bookService.getBooks()
        .pipe(
          map((books) => ({type: bookListLoaded.type, books})),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(private _actions$: Actions,
              private _bookService: BooksService) {
  }
}
