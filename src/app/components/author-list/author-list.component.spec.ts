import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorListComponent } from './author-list.component';
import { AuthorService } from '../../services/author.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let service: AuthorService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthorService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthorService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch authors from the service on init', () => {
    const mockAuthors = [
      { id: 1, lastname: 'Tolkien', firstname: 'JRR', imageUrl: '' },
      { id: 2, lastname: 'Martin', firstname: 'George RR', imageUrl: '' }
    ];

    spyOn(service, 'getAuthors').and.returnValue(of(mockAuthors));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.authors.length).toBe(2);
    expect(component.authors).toEqual(mockAuthors);
  });
});
