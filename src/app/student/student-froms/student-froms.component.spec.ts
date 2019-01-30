import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFromsComponent } from './student-froms.component';

describe('StudentFromsComponent', () => {
  let component: StudentFromsComponent;
  let fixture: ComponentFixture<StudentFromsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFromsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFromsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
