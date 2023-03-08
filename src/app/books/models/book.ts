import { BookPublicationDate, isBookPublicationDate } from './book-publication-date';

export interface Book {
  title: string;
  author: string;
  publicationDate: BookPublicationDate;
}

export const isBook = (input: unknown): input is Book =>
  !!input
  && typeof (input as any)?.title === 'string'
  && typeof (input as any)?.author === 'string'
  && isBookPublicationDate((input as any)?.publicationDate);
