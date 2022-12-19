import { TestBed } from '@angular/core/testing';

import { CargaCsvService } from './carga-csv.service';

describe('CargaCsvService', () => {
  let service: CargaCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
