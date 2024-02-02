import { TestBed } from '@angular/core/testing';

import { CrudMethodService } from './crud-method.service';

describe('CrudMethodService', () => {
  let service: CrudMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
