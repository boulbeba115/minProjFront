import { TestBed } from '@angular/core/testing';

import { ExportExelService } from './export-exel.service';

describe('ExportExelService', () => {
  let service: ExportExelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportExelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
