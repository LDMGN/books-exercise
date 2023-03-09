import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { bookListFeature, bookListLoad, BookListLoadingStatus } from '../state/book-list';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  public readonly bookLoadingStatus$: Observable<BookListLoadingStatus>;
  public readonly books$: Observable<Book[]>;

  constructor(private readonly store: Store) {
    this.bookLoadingStatus$ = this.store.select(bookListFeature.selectStatus);
    this.books$ = this.store.select(bookListFeature.selectBooks);
  }

  public isLoading(status: BookListLoadingStatus | null): boolean {
    return status === BookListLoadingStatus.LOADING;
  }

  public isLoaded(status: BookListLoadingStatus | null) {
    return status === BookListLoadingStatus.LOADED;
  }

  public loadingFailed(status: BookListLoadingStatus | null) {
    return status === BookListLoadingStatus.LOADING_FAILED;
  }

  public loadBooks(): void {
    this.store.dispatch(bookListLoad());
  }
}
