import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBookStepAComponent } from './add/add-book-step-a/add-book-step-a.component';
import { AddBookStepBComponent } from './add/add-book-step-b/add-book-step-b.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  declarations: [
    BookIndexComponent,
    BookListComponent,
    AddBookStepAComponent,
    AddBookStepBComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookIndexComponent,
        children: [
          {
            path: 'create',
            component: BookListComponent,
          },
          {
            path: '',
            component: BookListComponent,
          },
        ]
      },
    ]),
  ]
})
export class BooksModule {
}
