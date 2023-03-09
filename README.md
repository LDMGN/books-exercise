# Books front-end

## Initial setup

```
ng new books-assignment
cd books-assignment
npm i @ngrx/store @ngrx/effects
npm i luxon @types/luxon
ng add @angular/material --skip-confirmation
ng g m books
ng g s books/books
ng g c books/book-index
ng g c books/book-list
ng g c books/add-book
touch src/app/books/books.json
```

Angular Material is used simply to create a clean UI without much effort. It is not necessarily an essential library,
but certainly a convenient one.

## Jest

Use a preset to set up Jest: https://github.com/thymikee/jest-preset-angular/blob/main/README.md

```
npm i --save-dev jest @types/jest jest-preset-angular
```

```
// setup-jest.ts
import 'jest-preset-angular/setup-jest';
```

```
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
```

Run tests with Jest: `npm run jest`

Run tests with Karma: `npm run test`

## Modules & routing

App module & app component are set up with a router-outlet to be able to route (lazily-loaded) to various modules (only
BooksModule in this case).

```
    RouterModule.forRoot([
      {
        path: 'books',
        loadChildren: () => import('./books/books.module').then(m => m.BooksModule),
      },
      {path: '**', pathMatch: 'full', redirectTo: '/books'},
    ]),
```

The books module then routes to a books-index, which contains a menu, and a router-outlet to show either the list- or
create view:

```
    RouterModule.forChild([
      {
        path: '',
        component: BookIndexComponent,
        children: [
          {
            path: 'create',
            component: BookListComponent,
          },
          {
            path: '',
            component: BookListComponent,
          },
        ]
      },
    ]),
```

The books list component shows books, whereas the

## NgRx

Books list and loading status are kept in NgRx store, in a feature called book-list. A load action will trigger the
retrieval of books and keep track of the loading state so that the UI can display appropriate feedback (e.g. a spinner).

Input for adding a new book is kept in NgRx store, in feature new-book. A user can start filling in data, navigate to
other pages (there's only the book-list page of course), and come back to finish the work. The UI separates the form
into two parts to showcase the potential for keeping state in a wizard-like set of views. When a new book is added, the
progress state is kept as well, so a spinner can be shown. An effect will also trigger the book-list to reload when a
new book was added (when the new-book state is reset).

Effects are used for async storing and retrieval of books. Call delays are simulated in books.service.ts

## TypeScript

Type guards are used for validating some data formats. Publication date string format (a date) is also validated in a
type-guard. See [books.ts](./src/app/books/models/book.ts)
and [book-publication-date.ts](./src/app/books/models/book-publication-date.ts)

## Angular Reactive Forms

Forms are used for initial user input validation and user feedback
in [AddBookComponent](./src/app/books/add-book/add-book.component.ts). Feedback is both in color and (simple)
text/iconography (an asterisk). Textual feedback should be added for any server-side or application errors. The
TypeGuards should prevent data corruption, but error handling and user feedback could be improved with time.

## Rxjs

Rxjs is used throughout of course, but some specific handling of observables is done in the
beforementioned [AddBookComponent](./src/app/books/add-book/add-book.component.ts). It uses reactive forms, but initial
input coming from the store is (of course) in observable-form. There are only three fields now, but this won't scale
easily, with subscribing and unsubscribing for both store -> form and form -> store. Perhaps template-based forms could
provide an improvement by better supporting use of the async pipe to avoid manually keeping track of subscriptions.

## Tests

Unit tests are present for the type guards. These are simple, but therefore are really focused on the deterministic
methods ("units").

There is one component test (besides the generated default tests), for book-list. It checks whether the UI correctly
displays a loader when "[Book List] Loading" is triggered, and when the BooksService returns data, confirms that the
books are indeed displayed in the component.
