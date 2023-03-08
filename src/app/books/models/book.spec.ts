import { isBook } from './book';

describe('isBook', () => {
  it('should validate books', () => {
    expect(isBook({
      title: 'Test-book',
      author: 'Shakespeare',
      publicationDate: '2023-03-08'
    })).toEqual(true);
  });

  it('should invalidate non-books', () => {
    expect(isBook({
      title: 'Test-book',
      author: 'Shakespeare',
      publicationDate: '2023-03-08'
    })).toEqual(true);
  });

  it('should invalidate incomplete books', () => {
    expect(isBook({
      title: 'Test-book',
      publicationDate: '2023-03-08'
    })).toEqual(false);

    expect(isBook({
      title: 'Test-book',
      author: 'Shakespeare',
    })).toEqual(false);

    expect(isBook({
      author: 'Shakespeare',
      publicationDate: '2023-03-08'
    })).toEqual(false);
  });

  it('should invalidate otherwise valid books with invalid date', () => {
    expect(isBook({
      title: 'Test-book',
      author: 'Shakespeare',
      publicationDate: '2023-03-40'
    })).toEqual(false);

    expect(isBook({
      title: 'Test-book',
      author: 'Shakespeare',
      publicationDate: '2023-03'
    })).toEqual(false);

    expect(isBook({
      title: 'Test-book',
      author: 'Shakespeare',
    })).toEqual(false);
  });
});
