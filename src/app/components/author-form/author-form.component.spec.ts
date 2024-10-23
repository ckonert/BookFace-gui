import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorFormComponent } from './author-form.component';
import { AuthorService } from '../../services/author.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthorFormComponent', () => {
  let component: AuthorFormComponent;
  let fixture: ComponentFixture<AuthorFormComponent>;
  let service: AuthorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [AuthorService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when required fields are empty', () => {
    expect(component.authorForm.valid).toBeFalsy();

    const lastname = component.authorForm.controls['lastname'];
    const firstname = component.authorForm.controls['firstname'];

    lastname.setValue('');
    firstname.setValue('');

    expect(component.authorForm.valid).toBeFalsy();
  });

  it('should have a valid form when required fields are filled', () => {
    const lastname = component.authorForm.controls['lastname'];
    const firstname = component.authorForm.controls['firstname'];

    lastname.setValue('Martin');
    firstname.setValue('George RR');

    expect(component.authorForm.valid).toBeTruthy();
  });

  // it('should call the service to save the author when form is valid', () => {
  //   spyOn(service, 'createAuthor').and.returnValue(of({}));

  //   const lastname = component.authorForm.controls['lastname'];
  //   const firstname = component.authorForm.controls['firstname'];

  //   lastname.setValue('Martin');
  //   firstname.setValue('George RR');

  //   component.onSubmit();

  //   expect(service.createAuthor).toHaveBeenCalled();
  // });
});
