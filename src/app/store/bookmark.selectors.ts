import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookmarkState } from './bookmark.reducer';
import { Bookmark } from '../models/bookmark.model';
import Fuse from 'fuse.js';

export const selectBookmarkState = createFeatureSelector<BookmarkState>('bookmarks');

export const selectBookmarks = createSelector(
  selectBookmarkState,
  (state) => state.bookmarks
);

export const selectSearchQuery = createSelector(
  selectBookmarkState,
  (state) => state.searchQuery
);

export const selectLoading = createSelector(
  selectBookmarkState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectBookmarkState,
  (state) => state.error
);

export const selectFilteredBookmarks = createSelector(
  selectBookmarks,
  selectSearchQuery,
  (bookmarks, query) => {
    if (!query || query.trim() === '') {
      return bookmarks;
    }

    const fuse = new Fuse(bookmarks, {
      keys: ['title', 'description', 'url', 'tags'],
      threshold: 0.4,
      includeScore: true
    });

    return fuse.search(query).map(result => result.item);
  }
);

export const selectGroupedBookmarks = createSelector(
  selectFilteredBookmarks,
  (bookmarks) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    return {
      today: bookmarks.filter(bookmark => {
        const bookmarkDate = new Date(bookmark.createdAt);
        const bookmarkDateOnly = new Date(bookmarkDate.getFullYear(), bookmarkDate.getMonth(), bookmarkDate.getDate());
        return bookmarkDateOnly.getTime() === today.getTime();
      }),
      yesterday: bookmarks.filter(bookmark => {
        const bookmarkDate = new Date(bookmark.createdAt);
        const bookmarkDateOnly = new Date(bookmarkDate.getFullYear(), bookmarkDate.getMonth(), bookmarkDate.getDate());
        return bookmarkDateOnly.getTime() === yesterday.getTime();
      }),
      older: bookmarks.filter(bookmark => {
        const bookmarkDate = new Date(bookmark.createdAt);
        const bookmarkDateOnly = new Date(bookmarkDate.getFullYear(), bookmarkDate.getMonth(), bookmarkDate.getDate());
        return bookmarkDateOnly.getTime() < yesterday.getTime();
      })
    };
  }
);

export const selectBookmarkById = (id: string) => createSelector(
  selectBookmarks,
  (bookmarks) => bookmarks.find(bookmark => bookmark.id === id)
);