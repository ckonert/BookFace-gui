import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSelectionModalComponent } from './author-selection-modal.component';

describe('AuthorSelectionModalComponent', () => {
  let component: AuthorSelectionModalComponent;
  let fixture: ComponentFixture<AuthorSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorSelectionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
