import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { Book } from '../models/book';

export interface NewBookState {
  book: Partial<Book>;
  workingOnAdding: boolean;
}

export const newBookEdit = createAction('[New Book] EditBook', props<{ book: Partial<Book> }>());
export const newBookStore = createAction('[New Book] StoreBook', props<{ book: Book }>());
export const newBookReset = createAction('[New Book] Reset');

const defaultState = {
  book: {},
  workingOnAdding: false,
};

export const newBookFeature = createFeature({
  name: 'new-book',
  reducer: createReducer<NewBookState>(
    defaultState,
    on(newBookEdit, (state, payload) => ({
      ...state,
      book: {
        ...state.book,
        ...payload.book,
      }
    })),
    on(newBookStore, (state) => ({
      ...state,
      workingOnAdding: true,
    })),
    on(newBookReset, () => defaultState),
  ),
});
