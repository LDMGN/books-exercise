import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookIndexComponent } from './book-index/book-index.component';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookStepAComponent } from './add/add-book-step-a/add-book-step-a.component';
import { AddBookStepBComponent } from './add/add-book-step-b/add-book-step-b.component';



@NgModule({
  declarations: [
    BookIndexComponent,
    BookListComponent,
    AddBookStepAComponent,
    AddBookStepBComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BooksModule { }
