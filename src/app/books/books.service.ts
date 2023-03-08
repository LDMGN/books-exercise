import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
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
  providedIn: 'root'
})
export class BooksService {
  public getBooks(): Observable<Book[]> {
    const source = JsonBookSource;
    console.log(source);
    if (!isJsonSource(source)) {
      return throwError(() => 'Error retrieving books')
        .pipe(
          delay(2000)
        );
    }
    return of(source.books)
      .pipe(
        delay(2000)
      );
  }
}
