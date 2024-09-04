import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private fb: FormBuilder
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
      });
    }
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      if (this.bookId) {
        this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe();
      } else {
        this.bookService.createBook(this.bookForm.value).subscribe();
      }
    }
  }
}
