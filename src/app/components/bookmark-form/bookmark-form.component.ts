import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { Bookmark } from '../../models/bookmark.model';
import { selectBookmarkById, selectLoading } from '../../store/bookmark.selectors';
import * as BookmarkActions from '../../store/bookmark.actions';

@Component({
  selector: 'app-bookmark-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './bookmark-form.component.html',
  styleUrl: './bookmark-form.component.scss'
})
export class BookmarkFormComponent implements OnInit {
  bookmarkForm: FormGroup;
  isEditMode = false;
  bookmarkId: string | null = null;
  tags: string[] = [];
  loading$ = this.store.select(selectLoading);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookmarkForm = this.fb.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['']
    });
  }

  ngOnInit() {
    this.bookmarkId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.bookmarkId;

    if (this.isEditMode && this.bookmarkId) {
      this.store.select(selectBookmarkById(this.bookmarkId)).subscribe(bookmark => {
        if (bookmark) {
          this.bookmarkForm.patchValue({
            title: bookmark.title,
            url: bookmark.url,
            description: bookmark.description || ''
          });
          this.tags = [...bookmark.tags];
        }
      });
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.bookmarkForm.valid) {
      const bookmarkData = {
        ...this.bookmarkForm.value,
        tags: this.tags
      };

      if (this.isEditMode && this.bookmarkId) {
        this.store.dispatch(BookmarkActions.updateBookmark({ 
          id: this.bookmarkId, 
          bookmarkData 
        }));
      } else {
        this.store.dispatch(BookmarkActions.createBookmark({ bookmarkData }));
      }

      // Navigate back after a short delay to allow the action to complete
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 500);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}