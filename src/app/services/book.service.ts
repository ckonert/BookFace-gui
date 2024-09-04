import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/books/';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getBook(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  createBook(book: any): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
