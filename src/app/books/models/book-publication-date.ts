import { DateTime } from 'luxon';

export type BookPublicationDate = string;

export const isBookPublicationDate = (input: unknown): input is BookPublicationDate =>
  typeof input === 'string'
  && DateTime.fromFormat(input, 'yyyy-mm-dd').isValid;
