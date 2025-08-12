import { createReducer, on } from '@ngrx/store';
import { Bookmark } from '../models/bookmark.model';
import * as BookmarkActions from './bookmark.actions';

export interface BookmarkState {
  bookmarks: Bookmark[];
  searchQuery: string;
  loading: boolean;
  error: any;
}

export const initialState: BookmarkState = {
  bookmarks: [],
  searchQuery: '',
  loading: false,
  error: null
};

export const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkActions.loadBookmarks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(BookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks,
    loading: false,
    error: null
  })),
  on(BookmarkActions.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(BookmarkActions.createBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: [...state.bookmarks, bookmark],
    loading: false,
    error: null
  })),
  on(BookmarkActions.updateBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: state.bookmarks.map(b => b.id === bookmark.id ? bookmark : b),
    loading: false,
    error: null
  })),
  on(BookmarkActions.deleteBookmarkSuccess, (state, { id }) => ({
    ...state,
    bookmarks: state.bookmarks.filter(b => b.id !== id),
    loading: false,
    error: null
  })),
  on(BookmarkActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  })),
  on(
    BookmarkActions.createBookmark,
    BookmarkActions.updateBookmark,
    BookmarkActions.deleteBookmark,
    (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(
    BookmarkActions.createBookmarkFailure,
    BookmarkActions.updateBookmarkFailure,
    BookmarkActions.deleteBookmarkFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  )
);