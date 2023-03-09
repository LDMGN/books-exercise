import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookListLoad } from '../state/book-list';

@Component({
  selector: 'app-book-index',
  templateUrl: './book-index.component.html',
  styleUrls: ['./book-index.component.css']
})
export class BookIndexComponent implements OnInit {
  constructor(private readonly store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(bookListLoad());
  }
}
