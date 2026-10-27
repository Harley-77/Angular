import { TestBed } from '@angular/core/testing';
import { Cesto } from './cesto';

describe('Cesto', () => {
  let service: Cesto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cesto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
