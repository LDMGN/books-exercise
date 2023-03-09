import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { Book } from '../models/book';

export enum BookListLoadingStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  LOADING_FAILED = 'LOADING FAILED',
}

export interface BookListState {
  status: BookListLoadingStatus;
  books: Book[];
}

export const bookListLoad = createAction('[Book List] Loading');
export const bookListLoaded = createAction('[Book List] Loaded', props<{ books: Book[] }>());
export const bookListLoadingFailed = createAction('[Book List] Loading failed');

const defaultState = {
  books: [],
  status: BookListLoadingStatus.IDLE,
};

export const bookListFeature = createFeature({
  name: 'book-list',
  reducer: createReducer<BookListState>(
    defaultState,
    on(bookListLoad, () => ({
      books: [],
      status: BookListLoadingStatus.LOADING,
    })),
    on(bookListLoaded, (state, payload) => ({
      books: payload.books,
      status: BookListLoadingStatus.LOADED,
    })),
    on(bookListLoadingFailed, (err) => ({
      books: [],
      status: BookListLoadingStatus.LOADING_FAILED,
    })),
  ),
});
