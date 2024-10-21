import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-author-selection-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-selection-modal.component.html',
  styleUrl: './author-selection-modal.component.css',
})


export class AuthorSelectionModalComponent implements OnInit {
  authors: any[] = []; // Initially empty array for authors

  constructor(
    private authorService: AuthorService, // Inject the AuthorService
    public dialogRef: MatDialogRef<AuthorSelectionModalComponent>
  ) {}

  ngOnInit(): void {
    this.fetchAuthors(); // Fetch the authors when the modal is initialized
  }

  // Method to fetch authors from the service
  fetchAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (data) => {
        this.authors = data; // Assign the data to the authors array
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  selectAuthor(author: any) {
    this.dialogRef.close(author); // Return selected author
  }
}
