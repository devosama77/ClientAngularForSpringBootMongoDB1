import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFinancialComponent } from './details-financial.component';

describe('DetailsFinancialComponent', () => {
  let component: DetailsFinancialComponent;
  let fixture: ComponentFixture<DetailsFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
