import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BookService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books from the service on init', () => {
    const mockBooks = [
      { id: 1, title: 'A Game of Thrones', isbn13: '0553808044', authorId: 2, imageUrl: '' },
      { id: 2, title: 'The Lord of the Rings', isbn13: '9780008471286', authorId: 1, imageUrl: '' }
    ];

    spyOn(service, 'getBooks').and.returnValue(of(mockBooks));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.books.length).toBe(2);
    expect(component.books).toEqual(mockBooks);
  });
});
