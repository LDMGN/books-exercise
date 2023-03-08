import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books$?: Observable<Book[]>;

  constructor(private readonly _booksService: BooksService) {
  }

  public ngOnInit(): void {
    this.books$ = this._booksService.getBooks();
  }
}
