import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContainerTableComponent } from './student-container-table.component';

describe('StudentContainerTableComponent', () => {
  let component: StudentContainerTableComponent;
  let fixture: ComponentFixture<StudentContainerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContainerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentContainerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
