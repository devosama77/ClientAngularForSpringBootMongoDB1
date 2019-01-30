import { TestBed } from '@angular/core/testing';

import { CourseFromService } from './course-from.service';

describe('CourseFromService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseFromService = TestBed.get(CourseFromService);
    expect(service).toBeTruthy();
  });
});
