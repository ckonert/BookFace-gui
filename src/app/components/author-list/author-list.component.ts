import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
  standalone: true,
  imports: [RouterModule, NgFor]
})
export class AuthorListComponent implements OnInit {
  authors: any[] = [];

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  deleteAuthor(id: number): void {
    this.authorService.deleteAuthor(id).subscribe(() => {
      this.authors = this.authors.filter(author => author.id !== id);
    });
  }
}
