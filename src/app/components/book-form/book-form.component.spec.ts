import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './book-form.component';
import { BookService } from '../../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let service: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [BookService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when required fields are empty', () => {
    expect(component.bookForm.valid).toBeFalsy();

    const title = component.bookForm.controls['title'];
    const isbn13 = component.bookForm.controls['isbn13'];
    const authorId = component.bookForm.controls['authorId'];

    title.setValue('');
    isbn13.setValue('');
    authorId.setValue('');

    expect(component.bookForm.valid).toBeFalsy();
  });

  it('should have a valid form when required fields are filled', () => {
    const title = component.bookForm.controls['title'];
    const isbn13 = component.bookForm.controls['isbn13'];
    const authorId = component.bookForm.controls['authorId'];

    title.setValue('A Game of Thrones');
    isbn13.setValue('0553808044');
    authorId.setValue(2);

    expect(component.bookForm.valid).toBeTruthy();
  });

  it('should call the service to save the book when form is valid', () => {
    spyOn(service, 'createBook').and.returnValue(of({}));

    const title = component.bookForm.controls['title'];
    const isbn13 = component.bookForm.controls['isbn13'];
    const authorId = component.bookForm.controls['authorId'];

    title.setValue('A Game of Thrones');
    isbn13.setValue('0553808044');
    authorId.setValue(2);

    component.saveBook();

    expect(service.createBook).toHaveBeenCalled();
  });
});
