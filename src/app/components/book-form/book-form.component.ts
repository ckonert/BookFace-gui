import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthorSelectionModalComponent } from '../../author-selection-modal/author-selection-modal.component';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId?: number;
  selectedAuthor: any;
  isEditMode: any;
  authors: any;
  message: string = '';      // Message text
  messageType: string = '';  // 'success' or 'error'
  imageUrlPreview: string = '';  // Preview URL for the image

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      isbn13: ['', Validators.required],
      authorId: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe(data => {
        this.bookForm.patchValue(data);
        this.imageUrlPreview = data.imageUrl;  // Set initial image preview if editing
      });
    }

    // Listen to changes in the imageUrl field and update the preview
    this.bookForm.get('imageUrl')?.valueChanges.subscribe((url: string) => {
      this.imageUrlPreview = url;  // Update the preview URL as user types
    });
  }

    // Open the Author Selection Modal
    openAuthorSelection(): void {
      const dialogRef = this.dialog.open(AuthorSelectionModalComponent);
  
      dialogRef.afterClosed().subscribe(selectedAuthor => {
        if (selectedAuthor) {
          this.selectedAuthor = selectedAuthor;
          this.bookForm.patchValue({ authorId: selectedAuthor.id });
        }
      });
    }

  saveBook(): void {
    if (this.bookForm.valid) {
      if (this.bookId) {
        this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe(
          () => {
            this.message = 'The book has been updated successfully!';
            this.messageType = 'success';
          },
          (error) => {
            this.message = 'Something went wrong while updating the book.';
            this.messageType = 'error';
          }
        );
      } else {
        this.bookService.createBook(this.bookForm.value).subscribe(
          () => {
            this.message = 'The book has been created successfully!';
            this.messageType = 'success';
          },
          (error) => {
            this.message = 'Something went wrong while creating the book.';
            this.messageType = 'error';
          }
        );
      }
    }
  }
}
