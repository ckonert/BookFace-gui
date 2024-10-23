import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = 'http://localhost:8080/authors/';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getAuthor(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  createAuthor(author: any): Observable<any> {
    return this.http.post(this.baseUrl, author);
  }

  updateAuthor(id: number, author: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}`, author);
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
