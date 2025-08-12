import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { Bookmark } from '../../models/bookmark.model';
import { selectGroupedBookmarks, selectSearchQuery, selectLoading } from '../../store/bookmark.selectors';
import * as BookmarkActions from '../../store/bookmark.actions';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './bookmark-list.component.html',
  styleUrl: './bookmark-list.component.scss'
})
export class BookmarkListComponent implements OnInit {
  groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
  loading$ = this.store.select(selectLoading);
  searchQuery$ = this.store.select(selectSearchQuery);
  
  searchQuery = '';
  
  groups = [
    { key: 'today', title: 'Today' },
    { key: 'yesterday', title: 'Yesterday' },
    { key: 'older', title: 'Older' }
  ];

  private groupedBookmarks: any = {};

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(BookmarkActions.loadBookmarks());
    
    this.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
    
    this.groupedBookmarks$.subscribe(grouped => {
      this.groupedBookmarks = grouped;
    });
  }

  onSearchQueryChange() {
    this.store.dispatch(BookmarkActions.setSearchQuery({ query: this.searchQuery }));
  }

  getBookmarksForGroup(groupKey: string): Bookmark[] {
    return this.groupedBookmarks[groupKey] || [];
  }

  hasAnyBookmarks(): boolean {
    return Object.values(this.groupedBookmarks).some((bookmarks: any) => bookmarks.length > 0);
  }

  openBookmark(url: string) {
    window.open(url, '_blank');
  }

  editBookmark(event: Event, id: string) {
    event.stopPropagation();
    this.router.navigate(['/edit', id]);
  }

  deleteBookmark(event: Event, id: string) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this bookmark?')) {
      this.store.dispatch(BookmarkActions.deleteBookmark({ id }));
    }
  }

  createBookmark() {
    this.router.navigate(['/create']);
  }
}