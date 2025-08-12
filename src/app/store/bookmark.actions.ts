import { createAction, props } from '@ngrx/store';
import { Bookmark, BookmarkFormData } from '../models/bookmark.model';

export const loadBookmarks = createAction('[Bookmark] Load Bookmarks');

export const loadBookmarksSuccess = createAction(
  '[Bookmark] Load Bookmarks Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const loadBookmarksFailure = createAction(
  '[Bookmark] Load Bookmarks Failure',
  props<{ error: any }>()
);

export const createBookmark = createAction(
  '[Bookmark] Create Bookmark',
  props<{ bookmarkData: BookmarkFormData }>()
);

export const createBookmarkSuccess = createAction(
  '[Bookmark] Create Bookmark Success',
  props<{ bookmark: Bookmark }>()
);

export const createBookmarkFailure = createAction(
  '[Bookmark] Create Bookmark Failure',
  props<{ error: any }>()
);

export const updateBookmark = createAction(
  '[Bookmark] Update Bookmark',
  props<{ id: string; bookmarkData: BookmarkFormData }>()
);

export const updateBookmarkSuccess = createAction(
  '[Bookmark] Update Bookmark Success',
  props<{ bookmark: Bookmark }>()
);

export const updateBookmarkFailure = createAction(
  '[Bookmark] Update Bookmark Failure',
  props<{ error: any }>()
);

export const deleteBookmark = createAction(
  '[Bookmark] Delete Bookmark',
  props<{ id: string }>()
);

export const deleteBookmarkSuccess = createAction(
  '[Bookmark] Delete Bookmark Success',
  props<{ id: string }>()
);

export const deleteBookmarkFailure = createAction(
  '[Bookmark] Delete Bookmark Failure',
  props<{ error: any }>()
);

export const setSearchQuery = createAction(
  '[Bookmark] Set Search Query',
  props<{ query: string }>()
);