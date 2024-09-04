import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class AuthorFormComponent implements OnInit {
  authorForm: FormGroup;
  authorId?: number;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.authorId = +this.route.snapshot.paramMap.get('id')!;
    if (this.authorId) {
      this.authorService.getAuthor(this.authorId).subscribe(data => {
        this.authorForm.patchValue(data);
      });
    }
  }

  saveAuthor(): void {
    if (this.authorForm.valid) {
      if (this.authorId) {
        this.authorService.updateAuthor(this.authorId, this.authorForm.value).subscribe();
      } else {
        this.authorService.createAuthor(this.authorForm.value).subscribe();
      }
    }
  }
}
