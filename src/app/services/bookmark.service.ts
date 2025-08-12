import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Bookmark, BookmarkFormData } from '../models/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarks: Bookmark[] = [
    {
      id: '1',
      title: 'Angular Official Documentation',
      url: 'https://angular.dev',
      description: 'Comprehensive guide for Angular development',
      tags: ['angular', 'documentation', 'development'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'NgRx Documentation',
      url: 'https://ngrx.io',
      description: 'State management for Angular applications',
      tags: ['ngrx', 'state-management', 'angular'],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Material Design Components',
      url: 'https://material.angular.io',
      description: 'UI component library for Angular',
      tags: ['material', 'ui', 'components', 'angular'],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'RxJS Documentation',
      url: 'https://rxjs.dev',
      description: 'Reactive programming library for JavaScript',
      tags: ['rxjs', 'reactive', 'programming'],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  ];

  getBookmarks(): Observable<Bookmark[]> {
    return of([...this.bookmarks]).pipe(delay(300));
  }

  createBookmark(bookmarkData: BookmarkFormData): Observable<Bookmark> {
    const newBookmark: Bookmark = {
      id: this.generateId(),
      ...bookmarkData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.bookmarks.push(newBookmark);
    return of(newBookmark).pipe(delay(300));
  }

  updateBookmark(id: string, bookmarkData: BookmarkFormData): Observable<Bookmark> {
    const index = this.bookmarks.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookmarks[index] = {
        ...this.bookmarks[index],
        ...bookmarkData,
        updatedAt: new Date()
      };
      return of(this.bookmarks[index]).pipe(delay(300));
    }
    throw new Error('Bookmark not found');
  }

  deleteBookmark(id: string): Observable<void> {
    const index = this.bookmarks.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookmarks.splice(index, 1);
      return of(void 0).pipe(delay(300));
    }
    throw new Error('Bookmark not found');
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}