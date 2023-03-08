import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AddBookStepAComponent } from './add/add-book-step-a/add-book-step-a.component';
import { AddBookStepBComponent } from './add/add-book-step-b/add-book-step-b.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add/add-book/add-book.component';

@NgModule({
  declarations: [
    BookIndexComponent,
    BookListComponent,
    AddBookStepAComponent,
    AddBookStepBComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookIndexComponent,
        children: [
          {
            path: 'add',
            component: AddBookComponent,
          },
          {
            path: '',
            component: BookListComponent,
          },
        ]
      },
    ]),
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
  ]
})
export class BooksModule {
}
