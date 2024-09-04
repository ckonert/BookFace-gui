import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';

export const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'add-book', component: BookFormComponent },
  { path: 'edit-book/:id', component: BookFormComponent },
  { path: 'add-author', component: AuthorFormComponent },
  { path: 'edit-author/:id', component: AuthorFormComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
];
