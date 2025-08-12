import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BookmarkService } from '../services/bookmark.service';
import * as BookmarkActions from './bookmark.actions';

@Injectable()
export class BookmarkEffects {
  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.loadBookmarks),
      mergeMap(() =>
        this.bookmarkService.getBookmarks().pipe(
          map(bookmarks => BookmarkActions.loadBookmarksSuccess({ bookmarks })),
          catchError(error => of(BookmarkActions.loadBookmarksFailure({ error })))
        )
      )
    )
  );

  createBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.createBookmark),
      mergeMap(({ bookmarkData }) =>
        this.bookmarkService.createBookmark(bookmarkData).pipe(
          map(bookmark => BookmarkActions.createBookmarkSuccess({ bookmark })),
          catchError(error => of(BookmarkActions.createBookmarkFailure({ error })))
        )
      )
    )
  );

  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.updateBookmark),
      mergeMap(({ id, bookmarkData }) =>
        this.bookmarkService.updateBookmark(id, bookmarkData).pipe(
          map(bookmark => BookmarkActions.updateBookmarkSuccess({ bookmark })),
          catchError(error => of(BookmarkActions.updateBookmarkFailure({ error })))
        )
      )
    )
  );

  deleteBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.deleteBookmark),
      mergeMap(({ id }) =>
        this.bookmarkService.deleteBookmark(id).pipe(
          map(() => BookmarkActions.deleteBookmarkSuccess({ id })),
          catchError(error => of(BookmarkActions.deleteBookmarkFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService
  ) {}
}