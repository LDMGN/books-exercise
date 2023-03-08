import { isBookPublicationDate } from './book-publication-date';

describe('isBookPublicationDate', () => {
  it('should validate publication dates', () => {
    expect(isBookPublicationDate('2023-03-08')).toEqual(true);
  });

  it('should invalidate invalid strings / date formats', () => {
    expect(isBookPublicationDate('2023-03-08 00:00:00')).toEqual(false);
    expect(isBookPublicationDate('2023-03-40')).toEqual(false);
    expect(isBookPublicationDate('abc')).toEqual(false);
    expect(isBookPublicationDate('')).toEqual(false);
  });

  it('should invalidate invalid data types', () => {
    expect(isBookPublicationDate(undefined)).toEqual(false);
    expect(isBookPublicationDate({})).toEqual(false);
    expect(isBookPublicationDate(0)).toEqual(false);
    expect(isBookPublicationDate(true)).toEqual(false);
  });
});
