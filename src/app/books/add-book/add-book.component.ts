import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { MomentDateUtil } from '../../util/moment-date-util';
import { Book, isBook } from '../models/book';
import { isBookPublicationDate } from '../models/book-publication-date';
import { newBookEdit, newBookFeature, newBookReset, newBookStore } from '../state/new-book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  public savingBook$: Observable<boolean>;

  /* Form fields. */
  public newBookInputForm?: FormGroup;
  public bookTitleInput = new FormControl('', [
    Validators.required,
  ]);

  public bookPublicationDateInput = new FormControl('', [
    Validators.required,
    (control): ValidationErrors | null =>
      isBookPublicationDate(MomentDateUtil.getStringFrom(control.value)) ? null : {invalidDate: true},
  ]);

  public authorNameInput = new FormControl('', [
    Validators.required,
  ]);

  constructor(private readonly _store: Store,
              private readonly _actions: Actions,
              private readonly _router: Router) {
    firstValueFrom(this._store.select(newBookFeature.selectBook))
      .then((newBookState) => this.initForm(newBookState))
      .catch(() => this.initForm({}));
    this.savingBook$ = this._store.select(newBookFeature.selectWorkingOnAdding);

    /* Navigate to list when book is added. */
    firstValueFrom(this._actions
      .pipe(
        ofType(newBookReset),
      ))
      .then(() => this._router.navigate(['books']));
  }

  private initForm(newBook: Partial<Book>) {
    /* Sync title input and store. */
    if (newBook.title) {
      this.bookTitleInput.setValue(newBook.title);
    }
    this.bookTitleInput.valueChanges
      .subscribe((title) => this._store.dispatch(newBookEdit({
        book: {
          title: title || undefined,
        }
      })));

    /* Sync publication date input and store. */
    if (newBook.publicationDate) {
      this.bookPublicationDateInput.setValue(newBook.publicationDate);
    }
    this.bookPublicationDateInput.valueChanges
      .subscribe((publicationDate) => this._store.dispatch(newBookEdit({
        book: {
          publicationDate: publicationDate || undefined,
        }
      })));

    /* Sync author input and store. */
    if (newBook.author) {
      this.authorNameInput.setValue(newBook.author);
    }
    this.authorNameInput.valueChanges
      .subscribe((author) => this._store.dispatch(newBookEdit({
        book: {
          author: author || undefined,
        }
      })));

    /* Create form to link to stepper and over-all validation. */
    this.newBookInputForm = new FormGroup({
      title: this.bookTitleInput,
      publicationDate: this.bookPublicationDateInput,
      author: this.authorNameInput,
    });
  }

  public addBook(): void {
    if (!this.newBookInputForm?.valid) {
      return;
    }

    const book = {
      title: this.bookTitleInput.value,
      publicationDate: MomentDateUtil.getStringFrom(this.bookPublicationDateInput.value),
      author: this.authorNameInput.value,
    };

    if (!isBook(book)) {
      // TODO: Display error message, user input should be validated, so something went wrong application-wise
      return;
    }

    this._store.dispatch(newBookStore({book}));
  }
}
