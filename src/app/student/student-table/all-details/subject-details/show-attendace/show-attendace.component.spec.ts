import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAttendaceComponent } from './show-attendace.component';

describe('ShowAttendaceComponent', () => {
  let component: ShowAttendaceComponent;
  let fixture: ComponentFixture<ShowAttendaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAttendaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAttendaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
