import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterOutlet } from '@angular/router';

import { routes } from './app/app.routes';
import { bookmarkReducer } from './app/store/bookmark.reducer';
import { BookmarkEffects } from './app/store/bookmark.effects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ bookmarks: bookmarkReducer }),
    provideEffects([BookmarkEffects]),
    provideStoreDevtools()
  ]
});