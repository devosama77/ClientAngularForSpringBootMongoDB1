import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTableComponent } from './container-table.component';

describe('ContainerTableComponent', () => {
  let component: ContainerTableComponent;
  let fixture: ComponentFixture<ContainerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
