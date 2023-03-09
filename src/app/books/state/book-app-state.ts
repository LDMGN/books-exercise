import { BookListState } from './book-list';
import { NewBookState } from './new-book';

export const NEW_BOOK_STATE = 'New Book';

export const BOOK_LIST_STATE = 'Book List';

export interface BookAppState {
  [NEW_BOOK_STATE]: NewBookState;
  [BOOK_LIST_STATE]: BookListState;
}
