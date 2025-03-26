import { TestBed } from '@angular/core/testing';

import { CarDataService } from './node-storage.service';

describe('NodeStorageService', () => {
  let service: CarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
