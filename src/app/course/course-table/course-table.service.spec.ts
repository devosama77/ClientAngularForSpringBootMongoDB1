import { TestBed } from '@angular/core/testing';

import { CourseTableService } from './course-table.service';

describe('CourseTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseTableService = TestBed.get(CourseTableService);
    expect(service).toBeTruthy();
  });
  
});
