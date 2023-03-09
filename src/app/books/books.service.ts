import { Injectable } from '@angular/core';
import { delay, map, Observable, of, tap, throwError } from 'rxjs';
import JsonBookSource from './books.json';
import { Book, isBook } from './models/book';

interface JsonSource {
  books: Book[];
}

const isJsonSource = (input: unknown): input is JsonSource =>
  typeof input === 'object'
  && !Array.isArray(input)
  && Array.isArray((input as any).books)
  && (input as JsonSource).books.every(book => isBook(book));

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _books: Book[];

  constructor() {
    const source = JsonBookSource;
    if (isJsonSource(source)) {
      this._books = source.books;
    } else {
      this._books = [];
    }
  }

  public getBooks(): Observable<Book[]> {
    if (!this._books.length) {
      return throwError(() => 'Error retrieving books')
        .pipe(
          delay(2500)
        );
    }

    return of(this._books)
      .pipe(
        delay(1000)
      );
  }

  public addBook(book: Book): Observable<void> {
    return of({})
      .pipe(
        delay(1000),
        tap(() => this._books = [...this._books, book]),
        map(() => undefined)
      );
  }
}
