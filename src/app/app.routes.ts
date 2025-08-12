import { Routes } from '@angular/router';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';

export const routes: Routes = [
  { path: '', component: BookmarkListComponent },
  { path: 'create', component: BookmarkFormComponent },
  { path: 'edit/:id', component: BookmarkFormComponent },
  { path: '**', redirectTo: '' }
];