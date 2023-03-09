import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddBookComponent } from './add-book/add-book.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEffects } from './state/book-effects';
import { bookListFeature } from './state/book-list';
import { newBookFeature } from './state/new-book';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@NgModule({
  declarations: [
    BookIndexComponent,
    BookListComponent,
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
    StoreModule.forFeature(newBookFeature),
    EffectsModule.forFeature([
      BookEffects
    ]),
    StoreModule.forFeature(bookListFeature),
    EffectsModule.forFeature([
      BookEffects
    ]),
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ]
})
export class BooksModule {
}
