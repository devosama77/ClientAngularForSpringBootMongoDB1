import { TestBed } from '@angular/core/testing';

import { StudentFormsService } from './student-forms.service';

describe('StudentFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentFormsService = TestBed.get(StudentFormsService);
    expect(service).toBeTruthy();
  });
});
